<script setup>
import { ref } from 'vue'
import ApiService from '@/services/ApiService'
import SuperHeroForm from '@/components/SuperHeroForm.vue'
import SuperHeroCard from '@/components/SuperheroCard.vue'
import SuperHeroStats from '@/components/SuperheroStats.vue'

const heroData = ref(null)

// Función para obtener datos del superhéroe
const fetchSuperheroData = async (id) => {
  const data = await ApiService.fetchSuperheroById(id)
  heroData.value = data
}
</script>
<template>
  <div class="superhero-app">
    <SuperHeroForm @buscar-hero="fetchSuperheroData" />
    <SuperHeroCard :hero="heroData" v-if="heroData" />
    <SuperHeroStats :powerstats="heroData.powerstats" :heroName="heroData.name" v-if="heroData" />
  </div>
</template>

<style scoped>
.superhero-app {
  max-width: 500px;
  margin: auto;
}
</style>
