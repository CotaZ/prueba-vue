/**
 * Helpers generales para la aplicación
 */

import { useInstrumentStore } from '@/stores/modules/instruments.store'

/**
 * Funciones para manejo de fechas
 */
export const dateHelpers = {
  // Formatear fecha a formato local (ej: "15/03/2023")
  formatLocalDate(date, includeTime = false) {
    if (!date) return ''
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }
    if (includeTime) {
      options.hour = '2-digit'
      options.minute = '2-digit'
    }
    return new Date(date).toLocaleDateString('es-CL', options)
  },

  // Calcular diferencia en días entre dos fechas
  dateDiffInDays(startDate, endDate) {
    const diffTime = Math.abs(new Date(endDate) - new Date(startDate))
    return Math.floor(diffTime / (1000 * 60 * 60 * 24))
  },

  // Agregar días a una fecha
  addDays(date, days) {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }
}

/**
 * Funciones para manejo de números y cálculos financieros
 */
export const financialHelpers = {
  // Calcular porcentaje de cambio
  calculateChange(previous, current) {
    if (previous === 0) return 0
    return ((current - previous) / previous) * 100
  },

  // Redondear número a decimales específicos
  round(value, decimals = 2) {
    return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals)
  },

  // Formatear número como moneda (CLP por defecto)
  formatCurrency(value, currency = 'CLP') {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value)
  },

  // Calcular promedio de un array de números
  calculateAverage(numbers) {
    if (!numbers.length) return 0
    const sum = numbers.reduce((a, b) => a + b, 0)
    return sum / numbers.length
  }
}

/**
 * Funciones para manejo de arrays y colecciones
 */
export const arrayHelpers = {
  // Agrupar array por propiedad
  groupBy(array, key) {
    return array.reduce((result, item) => {
      (result[item[key]] = result[item[key]] || []).push(item)
      return result
    }, {})
  },

  // Ordenar array por propiedad
  sortBy(array, key, direction = 'asc') {
    return [...array].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1
      return 0
    })
  },

  // Filtrar elementos únicos por propiedad
  uniqueBy(array, key) {
    return [...new Map(array.map(item => [item[key], item])).values()]
  }
}

/**
 * Funciones para manipulación del DOM y UI
 */
export const uiHelpers = {
  // Scroll suave a elemento
  smoothScrollTo(elementId, offset = 80) {
    const element = document.getElementById(elementId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - offset,
        behavior: 'smooth'
      })
    }
  },

  // Copiar texto al portapapeles
  copyToClipboard(text) {
    return navigator.clipboard.writeText(text)
  },

  // Descargar archivo
  downloadFile(content, fileName, type = 'text/plain') {
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    a.click()
    URL.revokeObjectURL(url)
  }
}

/**
 * Funciones específicas para la aplicación financiera
 */
export const appHelpers = {
  // Obtener el color basado en la variación
  getVariationColor(value) {
    const store = useInstrumentStore()
    if (value > 0) return store.positiveColor || '#10b981'
    if (value < 0) return store.negativeColor || '#ef4444'
    return store.neutralColor || '#94a3b8'
  },

  // Generar ID único
  generateId(prefix = 'id') {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
  },

  // Debounce function
  debounce(func, wait = 300) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  },

  // Throttle function
  throttle(func, limit = 300) {
    let lastFunc
    let lastRan
    return function executedFunction(...args) {
      if (!lastRan) {
        func(...args)
        lastRan = Date.now()
      } else {
        clearTimeout(lastFunc)
        lastFunc = setTimeout(() => {
          if (Date.now() - lastRan >= limit) {
            func(...args)
            lastRan = Date.now()
          }
        }, limit - (Date.now() - lastRan))
      }
    }
  }
}

/**
 * Exportar todos los helpers como objeto único
 */
export default {
  ...dateHelpers,
  ...financialHelpers,
  ...arrayHelpers,
  ...uiHelpers,
  ...appHelpers
}