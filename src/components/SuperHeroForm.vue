<script setup>
import { ref } from 'vue'

const heroId = ref('')
const emit = defineEmits(['search-hero'])

const searchHero = () => {
  if (heroId.value) {
    emit('search-hero', heroId.value)
    heroId.value = '' // Limpiar el input después de buscar
  }
}
</script>

<template>
  <div>
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
</template>

<style scoped>
.input-group {
  max-width: 400px;
}
</style>
