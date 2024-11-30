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
    <div class="container mt-3 bg-dark rounded-3 py-5">
      <h1 class="display-4 text-warning">¡Encuentra a tu Super Héroe o Super Heroína!</h1>
      <label for="hero-id" class="form-label mt-5 mb-0"
        >Ingresa el ID del Superhéroe o Super Heroína</label
      >
      <div class="input-group mb-3 d-flex justify-content-center py-3 gap-5">
        <div class="col-12 col-md-auto">
          <input
            id="hero-id"
            type="number"
            class="form-control"
            v-model="heroId"
            placeholder=""
            min="1"
          />
        </div>
        <div class="col-12 col-md-auto">
          <button class="btn btn-danger fw-bold" @click="searchHero">Buscar</button>
        </div>
      </div>
      <p class="fw-bold pt-5">
        * Puedes consultar el ID de tu Super
        <a href="https://www.superheroapi.com/ids.html" class="link-warning">aquí</a>
      </p>
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
.bg-dark {
  --bs-bg-opacity: 0.5;
}
</style>
