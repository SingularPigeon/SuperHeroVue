<script setup>
import { ref } from 'vue'
import ApiService from '@/services/ApiService'
import SuperHeroForm from '@/components/SuperHeroForm.vue'
import SuperHeroCard from '@/components/SuperHeroCard.vue'
import SuperHeroStats from '@/components/SuperHeroStats.vue'

const heroData = ref(null)

// Función para obtener datos del superhéroe
const fetchSuperheroData = async (id) => {
  try {
    const data = await ApiService.fetchSuperheroById(id)
    heroData.value = data
    console.log('Datos del héroe:', heroData.value)
  } catch (error) {
    console.error('Error al obtener datos del superhéroe:', error)
  }
}
</script>

<template>
  <div class="container">
    <SuperHeroForm @buscar-hero="fetchSuperheroData" />
    <SuperHeroCard :hero="heroData" v-if="heroData" />
    <SuperHeroStats
      :powerstats="heroData?.powerstats"
      :heroName="heroData?.name"
      v-if="heroData?.powerstats"
    />
  </div>
</template>

<style scoped></style>
