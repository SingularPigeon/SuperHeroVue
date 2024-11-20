<script setup>
import { onMounted, watch, ref, defineProps, computed, nextTick } from 'vue'
import CanvasJSChart from '@canvasjs/vue-charts'

const props = defineProps({
  powerstats: Object,
  heroName: String,
})

// Referencia al gráfico
const chartRef = ref(null)

// Definimos un ref para almacenar los datos del gráfico
const chartData = ref([])

// Función para actualizar los datos del gráfico
const updateChartData = () => {
  chartData.value = Object.entries(props.powerstats || {})
    .filter(([_, value]) => value !== 'null' && value !== null && value !== undefined)
    .map(([key, value]) => ({
      y: Number(value),
      label: key.charAt(0).toUpperCase() + key.slice(1),
    }))

  // Aseguramos que el gráfico esté disponible antes de llamar a render
  if (chartRef.value?.chart) {
    chartRef.value.chart.render()
  }
}

// Opciones del gráfico, definido como un computed para actualizar cuando `chartData` cambia
const options = computed(() => ({
  theme: 'light2',
  animationEnabled: true,
  title: {
    text: `Estadísticas de Poder: ${props.heroName || 'Desconocido'}`,
  },
  data: [
    {
      type: 'doughnut',
      startAngle: 90,
      indexLabel: '{label} {y} (#percent%)',
      toolTipContent: "<span style='color: {color};'>{label}</span>, {y}",
      dataPoints: chartData.value,
    },
  ],
}))

// Cargamos el gráfico al montar el componente
onMounted(async () => {
  await nextTick() // Esperamos a que el gráfico esté montado
  updateChartData() // Inicializamos los datos del gráfico
})

// Observamos los cambios en las powerstats y actualizamos el gráfico
watch(
  () => props.powerstats,
  (newStats) => {
    if (newStats) {
      updateChartData() // Actualizamos los datos cuando cambian
    }
  },
)
</script>
<template>
  <div>
    <CanvasJSChart :options="options" />
  </div>
</template>
