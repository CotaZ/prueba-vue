import { createPinia } from 'pinia'
import { markRaw } from 'vue'
import router from '../router'  // Cambiado de '@/router' a '../router'

const pinia = createPinia()
// ...existing code...

// Opcional: Inyectar el router en todos los stores
pinia.use(({ store }) => {
  store.router = markRaw(router)
})

export default pinia