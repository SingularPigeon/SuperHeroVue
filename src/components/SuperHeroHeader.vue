<script setup>
import { ref } from 'vue'

const heroId = ref('')
const emit = defineEmits(['search-hero'])

const searchHero = () => {
  if (heroId.value) {
    emit('search-hero', heroId.value)
    heroId.value = '' // Limpia el input después de buscar
  }
}
</script>

<template>
  <header
    class="bg-dark text-white text-center d-flex flex-column justify-content-center algin-items-center"
  >
    <h1 class="display-4 text-warning">Encuentra tu Superhéroe</h1>
    <p>Ingresa el ID para buscar información sobre un superhéroe o heroína.</p>
    <div class="container mt-3">
      <label for="hero-id" class="form-label">ID del Superhéroe</label>
      <div class="input-group mb-3">
        <input
          id="hero-id"
          type="number"
          class="form-control"
          v-model="heroId"
          placeholder="Ingrese el ID del superhéroe"
          min="1"
        />
        <button class="btn btn-primary" @click="searchHero">Buscar</button>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  background-image: url('/img/pexels-introspectivedsgn-7524996.jpg');
  background-size: cover;
  background-position: center;
  color: #fff;
  height: 50rem;
}
</style>
