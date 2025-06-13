import axios from 'axios'
import { useInstrumentStore } from '@/stores/modules/instruments.store'

// Configuración base de Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/data',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor para manejo global de errores
api.interceptors.response.use(
  response => response.data,
  error => {
    const store = useInstrumentStore()
    let errorMessage = 'Error de conexión'
    
    if (error.response) {
      switch (error.response.status) {
        case 404:
          errorMessage = 'Recurso no encontrado'
          break
        case 500:
          errorMessage = 'Error del servidor'
          break
        default:
          errorMessage = error.response.data?.message || 'Error desconocido'
      }
    } else if (error.request) {
      errorMessage = 'Sin respuesta del servidor'
    }
    
    store.setError(errorMessage)
    return Promise.reject(error)
  }
)

/**
 * Servicios para datos financieros
 */
export const financialApi = {
  // Obtener lista de instrumentos
  async getInstruments() {
    try {
      const response = await api.get('/constituyentes/constituyensList.json')
      return response.map(item => ({
        symbol: item.simbolo,
        name: item.nombre,
        lastPrice: item.ultimoPrecio,
        variation: item.variacionPorcentual,
        openPrice: item.apertura,
        highPrice: item.maximo,
        lowPrice: item.minimo,
        previousClose: item.cierreAnterior,
        volume: item.volumen,
        marketCap: item.capitalizacion,
        isIPSA: item.esIPSA,
        isIGPA: item.esIGPA
      }))
    } catch (error) {
      throw new Error('Failed to load instruments data')
    }
  },

  // Obtener datos de un índice
  async getIndexData(indexId) {
    try {
      const response = await api.get(`/resumen/${indexId}.json`)
      return {
        id: response.id,
        name: response.nombre,
        currentValue: response.valorActual,
        variation: response.variacion,
        lastUpdate: new Date(response.actualizacion)
      }
    } catch (error) {
      throw new Error(`Failed to load ${indexId} data`)
    }
  },

  // Obtener datos históricos para gráficos
  async getHistoricalData(symbol, period) {
    try {
      const response = await api.get(`/history/history-${symbol}.json`)
      const periodMap = {
        '1D': 'daily',
        '1W': 'weekly',
        '1M': 'monthly',
        '3M': 'quarterly',
        '6M': 'semiannual',
        '1Y': 'annual'
      }
      
      return response[periodMap[period]] || []
    } catch (error) {
      throw new Error('Failed to load historical data')
    }
  },

  // Obtener datos en tiempo real (simulado)
  async getRealTimeData(symbols) {
    try {
      // En un entorno real, aquí se conectaría a WebSockets
      const response = await api.post('/realtime', { symbols })
      return response
    } catch (error) {
      throw new Error('Failed to connect to real-time service')
    }
  }
}

/**
 * Servicios de autenticación (si aplica)
 */
export const authApi = {
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials)
      return response
    } catch (error) {
      throw new Error('Invalid credentials')
    }
  },

  async refreshToken() {
    try {
      const response = await api.post('/auth/refresh')
      return response
    } catch (error) {
      throw new Error('Session expired')
    }
  }
}