<script setup>
import { onMounted, watch, ref } from 'vue'
import CanvasJSChart from '@canvasjs/vue-charts'

const props = defineProps({
  powerstats: Object,
  heroName: String,
})

// Definimos un ref para almacenar los datos del gráfico
const chartData = ref([])

// Actualizamos los datos del gráfico cuando las powerstats cambian
const updateChartData = () => {
  chartData.value = Object.entries(props.powerstats || {})
    .filter(([_, value]) => value !== 'null')
    .map(([key, value]) => ({ y: Number(value), label: key }))
}

// Opciones del gráfico
const options = ref({
  theme: 'light2',
  animationEnabled: true,
  title: {
    text: 'Estadisticas de poder',
  },
  data: [
    {
      type: 'doughnut',
      startAngle: 90,
      indexLabel: '{label} {y}(#percent%)',
      toolTipContent: "<span style='color: {color};'>{label}</span>, {y} tonnes",
      dataPoints: chartData.value, // Aquí usamos el ref
    },
  ],
})

const styleOptions = {
  width: '100%',
  height: '360px',
}

// Cargamos el gráfico al montar el componente
onMounted(() => {
  updateChartData() // Inicializamos los datos del gráfico
})

// Observamos los cambios en las powerstats
watch(chartData, () => {
  options.value.data[0].dataPoints = chartData.value
})
</script>

<template>
  <CanvasJSChart :options="options" :styles="styleOptions" />
</template>
