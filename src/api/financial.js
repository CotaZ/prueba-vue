import axios from 'axios'

import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/data'


const api = axios.create({
  baseURL: API_BASE_URL
})

export const fetchInstruments = async () => {
  try {
    const response = await api.get('/constituyentes/constituyensList.json')
    return response.data.map(instr => ({
      symbol: instr.simbolo,
      name: instr.nombre,
      lastPrice: instr.ultimoPrecio,
      variation: instr.variacionPorcentual,
      openPrice: instr.apertura,
      highPrice: instr.maximo,
      lowPrice: instr.minimo,
      previousClose: instr.cierreAnterior,
      volume: instr.volumen,
      marketCap: instr.capitalizacion,
      isIPSA: instr.esIPSA,
      isIGPA: instr.esIGPA
    }))
  } catch (error) {
    console.error('Error fetching instruments:', error)
    throw new Error('Failed to load instruments data')
  }
}

export const fetchIndexData = async (indexId) => {
  try {
    const response = await api.get(`/resumen/${indexId}.json`)
    return {
      id: response.data.id,
      name: response.data.nombre,
      currentValue: response.data.valorActual,
      variation: response.data.variacion,
      lastUpdate: new Date(response.data.actualizacion)
    }
  } catch (error) {
    console.error(`Error fetching ${indexId} data:`, error)
    throw new Error(`Failed to load ${indexId} data`)
  }
}

export const fetchChartData = async (symbol, period) => {
  try {
    const response = await api.get(`/history/history-${symbol}.json`)
    const rawData = response.data[period] || []
    
    return {
      labels: rawData.map(item => item.fecha),
      datasets: [
        {
          label: 'Precio',
          data: rawData.map(item => item.precio),
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true
        }
      ]
    }
  } catch (error) {
    console.error(`Error fetching chart data for ${symbol}:`, error)
    throw new Error('Failed to load chart data')
  }
}