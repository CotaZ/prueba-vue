import { ref } from 'vue'
import { 
  fetchInstruments, 
  fetchIndexData, 
  fetchChartData 
} from '@/api/financial'

export function useFetchData() {
  const loading = ref(false)
  const error = ref(null)

  const getInstruments = async () => {
    try {
      loading.value = true
      error.value = null
      return await fetchInstruments()
    } catch (err) {
      error.value = err.message
      console.error('Error fetching instruments:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const getIndexData = async (indexId) => {
    try {
      loading.value = true
      error.value = null
      return await fetchIndexData(indexId)
    } catch (err) {
      error.value = err.message
      console.error(`Error fetching ${indexId} data:`, err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const getChartData = async (symbol, period) => {
    try {
      loading.value = true
      error.value = null
      return await fetchChartData(symbol, period)
    } catch (err) {
      error.value = err.message
      console.error(`Error fetching chart data for ${symbol}:`, err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    getInstruments,
    getIndexData,
    getChartData
  }
}