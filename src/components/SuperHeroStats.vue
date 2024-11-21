<script setup>
import CanvasJSChart from '@canvasjs/vue-charts'

defineProps({
  stats: Object,
})

const options = {
  animationEnabled: true,
  title: {
    text: 'Estadísticas del Superhéroe',
  },
  data: [
    {
      type: 'column',
      dataPoints: [],
    },
  ],
}

if (stats) {
  options.data[0].dataPoints = Object.entries(stats).map(([key, value]) => ({
    label: key,
    y: value !== 'null' ? Number(value) : 0,
  }))
}
</script>

<template>
  <div v-if="stats">
    <CanvasJSChart :options="options" />
  </div>
</template>
