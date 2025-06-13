<template>
  <div class="chart-container">
    <div class="chart-header">
      <h3>Evolución Histórica</h3>
      <ChartPeriodSelector />
    </div>
    <div class="chart-wrapper">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Chart, registerables } from 'chart.js'
import { useInstrumentStore } from '@/stores/modules/instruments.store'
import ChartPeriodSelector from './ChartPeriodSelector.vue'

Chart.register(...registerables)
const chartCanvas = ref(null)
let chartInstance = null

const store = useInstrumentStore()

const initChart = () => {
  if (chartInstance) {
    chartInstance.destroy()
  }

  const ctx = chartCanvas.value.getContext('2d')
  
  chartInstance = new Chart(ctx, {
    type: 'line',
    data: store.chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          grid: { color: 'rgba(255, 255, 255, 0.1)' },
          ticks: { color: 'rgba(255, 255, 255, 0.7)' }
        },
        x: {
          grid: { display: false },
          ticks: { color: 'rgba(255, 255, 255, 0.7)' }
        }
      }
    }
  })
}

onMounted(initChart)
watch(() => store.chartData, initChart)
</script>

<style scoped>
.chart-container {
  background-color: var(--color-background-card);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.chart-header h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.chart-wrapper {
  position: relative;
  height: 300px;
  width: 100%;
}
</style>