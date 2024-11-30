<script setup>
import { ref, computed } from 'vue'
import ApiService from './services/ApiService'
import SuperHeroNav from './components/SuperHeroNav.vue'
import SuperHeroHeader from './components/SuperHeroHeader.vue'
import SuperHeroCard from './components/SuperHeroCard.vue'
import SuperHeroFooter from './components/SuperHeroFooter.vue'
import SuperHeroNoData from './components/SuperHeroNoData.vue'

const hero = ref(null)
const errorMessage = ref('')

// Función para hacer scroll al componente del héroe
const scrollToComponent = () => {
  setTimeout(() => {
    const targetElement = document.getElementById('target-component')
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' })
    }
  }, 250)
}

// Función para obtener los datos del héroe
const fetchHero = async (id) => {
  try {
    const data = await ApiService.fetchSuperheroById(id)
    if (data) {
      hero.value = data
      errorMessage.value = ''
      scrollToComponent() // Llama al scroll una vez que se carguen los datos
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

// Comprobación si las estadísticas son válidas
const hasValidStats = computed(() => {
  if (!hero.value || !hero.value.powerstats) return false
  return Object.values(hero.value.powerstats).some((value) => value !== 'null' && value > 0)
})

// Configuración inicial del gráfico
const getChartOptions = (stats, heroName) => ({
  animationEnabled: true,
  backgroundColor: '#212529',

  title: {
    text: `Estadísticas para ${heroName || 'Desconocido'}`,
    fontColor: '#fafafa',
  },
  data: [
    {
      type: 'doughnut',
      showInLegend: false,
      toolTipContent: '<b>{label}</b>: {y}',
      indexLabelFontColor: '#fafafa',
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
    <div class="container my-5 pb-5">
      <div class="row pb-5">
        <p v-if="errorMessage" class="text-danger text-center">{{ errorMessage }}</p>
        <div class="col-12 col-md-6">
          <SuperHeroCard v-if="hero" :hero="hero" id="target-component" />
        </div>
        <div class="col-12 col-md-6 text-center">
          <div v-if="hero && hasValidStats">
            <CanvasJSChart :options="getChartOptions(hero.powerstats, hero.name)" />
          </div>
          <SuperHeroNoData v-else-if="hero" />
        </div>
      </div>
    </div>
  </div>
  <SuperHeroFooter />
</template>
