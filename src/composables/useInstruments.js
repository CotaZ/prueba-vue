import { computed, ref } from 'vue'
import { useFetchData } from './useFetchData'
import { useInstrumentStore } from '@/stores/modules/instruments.store'

export function useInstruments() {
  const store = useInstrumentStore()
  const { getInstruments, getIndexData, getChartData } = useFetchData()
  
  const searchQuery = ref('')
  const activeTab = ref('all')

  const filteredInstruments = computed(() => {
    let filtered = store.instruments
    
    // Filter by search query
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(instr => 
        instr.symbol.toLowerCase().includes(query) || 
        instr.name.toLowerCase().includes(query)
      )
    }
    
    // Filter by active tab
    if (activeTab.value !== 'all') {
      filtered = filtered.filter(instr => 
        activeTab.value === 'ipsa' ? instr.isIPSA :
        activeTab.value === 'igpa' ? instr.isIGPA :
        true
      )
    }
    
    return filtered
  })

  const loadInitialData = async () => {
    try {
      store.isLoading = true
      const [instruments, indexData] = await Promise.all([
        getInstruments(),
        getIndexData('IPSA')
      ])
      
      store.instruments = instruments
      store.currentIndex = indexData
      store.selectedInstrument = instruments[0]
      
      await loadChartData()
    } catch (err) {
      store.error = err.message
    } finally {
      store.isLoading = false
    }
  }

  const loadChartData = async () => {
    if (!store.selectedInstrument) return
    
    try {
      store.isLoading = true
      const data = await getChartData(
        store.selectedInstrument.symbol, 
        store.chartPeriod
      )
      store.chartData = data
    } catch (err) {
      store.error = err.message
    } finally {
      store.isLoading = false
    }
  }

  const selectInstrument = (instrument) => {
    store.selectedInstrument = instrument
    loadChartData()
  }

  const setChartPeriod = (period) => {
    store.chartPeriod = period
    loadChartData()
  }

  const setSearchQuery = (query) => {
    searchQuery.value = query
  }

  const setActiveTab = (tab) => {
    activeTab.value = tab
  }

  return {
    loading: computed(() => store.isLoading),
    error: computed(() => store.error),
    instruments: computed(() => store.instruments),
    currentIndex: computed(() => store.currentIndex),
    selectedInstrument: computed(() => store.selectedInstrument),
    chartData: computed(() => store.chartData),
    filteredInstruments,
    searchQuery,
    activeTab,
    loadInitialData,
    selectInstrument,
    setChartPeriod,
    setSearchQuery,
    setActiveTab
  }
}