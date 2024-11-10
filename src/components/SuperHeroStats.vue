<template>
  <div id="chartContainer"></div>
</template>

<script setup>
import { onMounted, watch, defineProps, getCurrentInstance } from 'vue'

const props = defineProps({
  powerstats: Object,
  heroName: String,
})

const { proxy } = getCurrentInstance() // Acceso a instancia para obtener $canvasjs

const renderChart = () => {
  const chartData = Object.entries(props.powerstats || {})
    .filter(([_, value]) => value !== 'null')
    .map(([key, value]) => ({ y: Number(value), label: key }))

  const chart = new proxy.$canvasjs.Chart('chartContainer', {
    theme: 'dark1',
    backgroundColor: '#212529',
    title: {
      animationEnabled: true,
      text: `Estadísticas de Poder para ${props.heroName}`,
      fontSize: 28,
    },
    data: [
      {
        type: 'doughnut',
        startAngle: 60,
        innerRadius: 40,
        indexLabelFontSize: 17,
        indexLabel: '{label} - #percent%',
        toolTipContent: '<b>{label}:</b> {y} (#percent%)',
        connectNullData: true,
        dataPoints: chartData,
      },
    ],
  })
  chart.render()
}

watch(() => props.powerstats, renderChart)
onMounted(renderChart)
</script>
