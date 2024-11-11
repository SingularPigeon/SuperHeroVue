<script setup>
import { ref } from 'vue'

const heroId = ref('')

const emit = defineEmits(['buscar-hero'])

const sendHeroId = () => {
  if (heroId.value) {
    emit('buscar-hero', heroId.value)
  }
}
</script>
<template>
  <div class="input-group mb-3">
    <input
      type="number"
      v-model="heroId"
      placeholder="Ingrese ID del Superhéroe"
      class="form-control"
      min="1"
    />
    <button @click="sendHeroId" class="btn btn-primary">Buscar Superhéroe</button>
  </div>
</template>
