<script setup>
import { ref } from 'vue'
import ApiService from './services/ApiService'
import SuperHeroNav from './components/SuperHeroNav.vue'
import SuperHeroHeader from './components/SuperHeroHeader.vue'
import SuperHeroCard from './components/SuperHeroCard.vue'

const hero = ref(null)
const errorMessage = ref('')

const fetchHero = async (id) => {
  try {
    const data = await ApiService.fetchSuperheroById(id)
    if (data) {
      hero.value = data
      errorMessage.value = ''
    } else {
      hero.value = null
      errorMessage.value = 'No se encontraron datos para este ID.'
    }
  } catch (error) {
    console.error('Error al buscar el superhéroe:', error)
    hero.value = null
    errorMessage.value = 'Hubo un problema al buscar el superhéroe.'
  }
}

// Configuración inicial del gráfico
const getChartOptions = (stats) => ({
  animationEnabled: true,
  title: {
    text: 'Estadísticas del Superhéroe',
  },
  data: [
    {
      type: 'doughnut',
      showInLegend: true,
      toolTipContent: '<b>{label}</b>: {y}',
      dataPoints: Object.entries(stats || {}).map(([key, value]) => ({
        label: key,
        y: value !== 'null' ? Number(value) : 0,
      })),
    },
  ],
})
</script>

<template>
  <SuperHeroNav />
  <div>
    <SuperHeroHeader @search-hero="fetchHero" />
    <div class="container my-5">
      <p v-if="errorMessage" class="text-danger text-center">{{ errorMessage }}</p>
      <SuperHeroCard v-if="hero" :hero="hero" />
      <div v-if="hero && hero.powerstats">
        <CanvasJSChart :options="getChartOptions(hero.powerstats)" />
      </div>
    </div>
  </div>
</template>

<style>
.container {
  max-width: 800px;
}
</style>
