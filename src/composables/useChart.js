import { ref, onMounted, watch } from 'vue'
import { Chart, registerables } from 'chart.js'
import { useInstrumentStore } from '@/stores/modules/instruments.store'

Chart.register(...registerables)

export function useChart(canvasRef) {
  const store = useInstrumentStore()
  const chartInstance = ref(null)

  const initChart = () => {
    if (chartInstance.value) {
      chartInstance.value.destroy()
    }

    if (!canvasRef.value) return
    
    const ctx = canvasRef.value.getContext('2d')
    
    chartInstance.value = new Chart(ctx, {
      type: 'line',
      data: store.chartData,
      options: getChartOptions()
    })
  }

  const getChartOptions = () => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: none },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: '#1e293b',
        titleColor: '#f8fafc',
        bodyColor: '#94a3b8',
        borderColor: '#334155',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || ''
            if (label) label += ': '
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('es-CL', {
                style: 'currency',
                currency: 'CLP'
              }).format(context.parsed.y)
            }
            return label
          }
        }
      }
    },
    scales: {
      y: {
        grid: { 
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false
        },
        ticks: { 
          color: 'rgba(255, 255, 255, 0.7)',
          callback: (value) => {
            return new Intl.NumberFormat('es-CL', {
              style: 'currency',
              currency: 'CLP',
              maximumFractionDigits: 0
            }).format(value)
          }
        }
      },
      x: {
        grid: { display: false },
        ticks: { 
          color: 'rgba(255, 255, 255, 0.7)',
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 8
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  })

  onMounted(initChart)
  watch(() => store.chartData, initChart)

  return {
    chartInstance
  }
}