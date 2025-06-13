/**
 * Validadores para formularios y datos financieros
 */
export const validators = {
  // Validar símbolo de instrumento (ej: 'AAPL', 'BCI')
  instrumentSymbol(value) {
    if (!value) return 'El símbolo es requerido'
    if (!/^[A-Z]{1,6}(\.[A-Z]{1,2})?$/.test(value)) {
      return 'Símbolo inválido (ej: BCI, ANDINA-B)'
    }
    return true
  },

  // Validar montos financieros
  amount(value) {
    if (isNaN(value)) return 'Debe ser un número válido'
    if (parseFloat(value) <= 0) return 'Debe ser mayor a cero'
    return true
  },

  // Validar porcentajes (-100% a 100%)
  percentage(value) {
    if (isNaN(value)) return 'Debe ser un número válido'
    const num = parseFloat(value)
    if (num < -100 || num > 100) return 'Debe estar entre -100% y 100%'
    return true
  },

  // Validar fechas
  date(value) {
    if (!value) return 'La fecha es requerida'
    const date = new Date(value)
    if (isNaN(date.getTime())) return 'Fecha inválida'
    return true
  },

  // Validar correo electrónico
  email(value) {
    if (!value) return 'El email es requerido'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Email inválido'
    }
    return true
  },

  // Validar contraseña (mínimo 8 caracteres)
  password(value) {
    if (!value) return 'La contraseña es requerida'
    if (value.length < 8) return 'Mínimo 8 caracteres'
    return true
  }
}

/**
 * Funciones de sanitización
 */
export const sanitizers = {
  cleanSymbol(value) {
    return value ? value.trim().toUpperCase() : ''
  },

  formatAmount(value) {
    return parseFloat(value).toFixed(2)
  },

  normalizeText(value) {
    return value ? value.trim().replace(/\s+/g, ' ') : ''
  }
}

/**
 * Helpers para validación
 */
export const validationHelpers = {
  // Validar formulario completo
  validateForm(formData, rules) {
    const errors = {}
    let isValid = true

    Object.keys(rules).forEach(key => {
      const rule = rules[key]
      const value = formData[key]
      const validation = rule(value)
      
      if (validation !== true) {
        errors[key] = validation
        isValid = false
      }
    })

    return { isValid, errors }
  },

  // Mapear errores de API a campos de formulario
  mapApiErrors(apiError, fieldMap) {
    const errors = {}
    if (apiError.response?.data?.errors) {
      Object.entries(apiError.response.data.errors).forEach(([field, messages]) => {
        if (fieldMap[field]) {
          errors[fieldMap[field]] = messages.join(', ')
        }
      })
    }
    return errors
  }
}