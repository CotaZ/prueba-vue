import { ref } from 'vue'

export function useDebounce(wait = 300) {
  const timeout = ref(null)

  const debounce = (func) => {
    return (...args) => {
      clearTimeout(timeout.value)
      timeout.value = setTimeout(() => {
        func.apply(this, args)
      }, wait)
    }
  }

  const cancel = () => {
    clearTimeout(timeout.value)
  }

  return {
    debounce,
    cancel
  }
}