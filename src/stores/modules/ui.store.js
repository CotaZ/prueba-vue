import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useUIStore = defineStore('ui', {
  state: () => ({
    darkMode: useLocalStorage('darkMode', true),
    sidebarCollapsed: useLocalStorage('sidebarCollapsed', false),
    selectedTheme: useLocalStorage('selectedTheme', 'default')
  }),

  actions: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode
    },
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed
    }
  }
})