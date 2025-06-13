import { defineStore } from 'pinia'
import { fetchInstruments, fetchIndexData, fetchChartData } from '@/api/financial'
import { useLocalStorage } from '@vueuse/core'

export const useInstrumentStore = defineStore('instruments', {
  state: () => ({
    instruments: [],
    selectedInstrument: null,
    currentIndex: useLocalStorage('currentIndex', { 
      id: 'IPSA', 
      name: 'IPSA Chile' 
    }),
    chartData: {},
    chartPeriod: useLocalStorage('chartPeriod', '1M'),
    searchQuery: '',
    activeTab: 'all',
    isLoading: false,
    error: null
  }),

  getters: {
    filteredInstruments: (state) => {
      let filtered = state.instruments
      
      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase()
        filtered = filtered.filter(instr => 
          instr.symbol.toLowerCase().includes(query) || 
          instr.name.toLowerCase().includes(query)
        )
      }
      
      if (state.activeTab !== 'all') {
        filtered = filtered.filter(instr => 
          state.activeTab === 'ipsa' ? instr.isIPSA :
          state.activeTab === 'igpa' ? instr.isIGPA :
          true
        )
      }
      
      return filtered
    }
  },

  actions: {
    async loadInitialData() {
      try {
        this.isLoading = true
        const [instruments, indexData] = await Promise.all([
          fetchInstruments(),
          fetchIndexData(this.currentIndex.id)
        ])
        
        this.instruments = instruments
        this.selectedInstrument = instruments[0]
        await this.loadChartData()
      } catch (err) {
        this.error = err.message
      } finally {
        this.isLoading = false
      }
    },

    async loadChartData() {
      if (!this.selectedInstrument) return
      
      try {
        this.isLoading = true
        const data = await fetchChartData(
          this.selectedInstrument.symbol, 
          this.chartPeriod
        )
        this.chartData = data
      } catch (err) {
        this.error = err.message
      } finally {
        this.isLoading = false
      }
    },

    setSelectedInstrument(instrument) {
      this.selectedInstrument = instrument
      this.loadChartData()
    },

    setChartPeriod(period) {
      this.chartPeriod = period
      this.loadChartData()
    },

    setSearchQuery(query) {
      this.searchQuery = query
    },

    setActiveTab(tab) {
      this.activeTab = tab
    },

    setCurrentIndex(index) {
      this.currentIndex = index
      this.loadInitialData()
    }
  }
})