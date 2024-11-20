<template>
  <div>
    <h3>Estadísticas de Poder: {{ heroName }}</h3>
    <Doughnut :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js'

// Registrar los componentes de Chart.js necesarios
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

// Definir props para recibir los datos
const props = defineProps({
  powerstats: Object,
  heroName: String,
})

// Datos y opciones del gráfico
const chartData = ref({
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0', '#9966ff', '#ff9f40'],
    },
  ],
})

const chartOptions = computed(() => ({
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: `Estadísticas de Poder: ${props.heroName || 'Desconocido'}`,
    },
    tooltip: {
      callbacks: {
        label: (context) => `${context.label}: ${context.raw} (${context.percentage}%)`,
      },
    },
  },
}))

// Función para actualizar los datos del gráfico
const updateChartData = () => {
  const data = Object.entries(props.powerstats || {})
    .filter(([_, value]) => value !== 'null' && value !== null && value !== undefined)
    .map(([key, value]) => ({
      label: key.charAt(0).toUpperCase() + key.slice(1),
      value: Number(value),
    }))

  // Actualizar etiquetas y datos en el gráfico
  chartData.value.labels = data.map((item) => item.label)
  chartData.value.datasets[0].data = data.map((item) => item.value)
}

// Inicializar y observar cambios en los datos de `powerstats`
onMounted(updateChartData)
watch(() => props.powerstats, updateChartData)
</script>

<style scoped>
/* Agrega estilos personalizados para el gráfico si es necesario */
</style>
