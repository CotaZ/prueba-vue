<template>
  <div class="search-container">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Buscar instrumento..."
      class="search-input"
      @input="handleSearch"
    />
    <button class="search-button">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useInstrumentStore } from '@/stores/modules/instruments.store'
import { debounce } from '@/utils/helpers'

const store = useInstrumentStore()
const searchQuery = ref('')

const handleSearch = debounce(() => {
  store.setSearchQuery(searchQuery.value)
}, 300)
</script>

<style scoped>
.search-container {
  position: relative;
  margin-bottom: 1.5rem;
}

.search-input {
  width: 100%;
  padding: 0.875rem 1rem;
  padding-left: 3rem;
  background-color: var(--color-background-input);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  color: var(--color-text-primary);
  font-size: 1rem;
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb), 0.1);
}

.search-button {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
}

.search-button svg {
  width: 1.25rem;
  height: 1.25rem;
}
</style>