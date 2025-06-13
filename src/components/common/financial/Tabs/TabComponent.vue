<template>
  <div class="tabs-container">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      :class="{ active: activeTab === tab.id }"
      @click="selectTab(tab.id)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useInstrumentStore } from '@/stores/modules/instruments.store'

const store = useInstrumentStore()
const activeTab = ref(store.activeTab)

const tabs = [
  { id: 'all', label: 'Todos' },
  { id: 'ipsa', label: 'IPSA' },
  { id: 'igpa', label: 'IGPA' },
  { id: 'other', label: 'Otros' }
]

const selectTab = (tabId) => {
  activeTab.value = tabId
  store.setActiveTab(tabId)
}
</script>

<style scoped>
.tabs-container {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tabs-container button {
  background-color: var(--color-background-button);
  color: var(--color-text-secondary);
  border: none;
  border-radius: var(--border-radius-sm);
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tabs-container button:hover {
  background-color: var(--color-background-button-hover);
}

.tabs-container button.active {
  background-color: var(--color-primary);
  color: white;
}
</style>