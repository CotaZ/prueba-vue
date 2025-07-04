import { computed } from 'vue'

export function useFilters() {
  const formatCurrency = (value) => {
    if (value === undefined || value === null) return '-'
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value)
  }

  const formatVariation = (value) => {
    if (value === undefined || value === null) return '-'
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
  }

  const formatNumber = (value) => {
    if (value === undefined || value === null) return '-'
    return new Intl.NumberFormat('es-CL').format(value)
  }

  const formatDateTime = (date) => {
    if (!date) return '-'
    return new Intl.DateTimeFormat('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const formatVolume = (value) => {
    if (value === undefined || value === null) return '-'
    
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`
    }
    return value.toString()
  }

  return {
    formatCurrency,
    formatVariation,
    formatNumber,
    formatDateTime,
    formatVolume
  }
}