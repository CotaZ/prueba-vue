<template>
  <div class="period-selector">
    <button
      v-for="period in periods"
      :key="period.value"
      :class="{ active: selectedPeriod === period.value }"
      @click="selectPeriod(period.value)"
    >
      {{ period.label }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useInstrumentStore } from '@/stores/modules/instruments.store'

const store = useInstrumentStore()
const selectedPeriod = ref(store.chartPeriod)

const periods = [
  { value: '1D', label: '1 Día' },
  { value: '1W', label: '1 Semana' },
  { value: '1M', label: '1 Mes' },
  { value: '3M', label: '3 Meses' },
  { value: '6M', label: '6 Meses' },
  { value: '1Y', label: '1 Año' }
]

const selectPeriod = (period) => {
  selectedPeriod.value = period
  store.setChartPeriod(period)
}
</script>

<style scoped>
.period-selector {
  display: flex;
  gap: 0.5rem;
}

.period-selector button {
  background-color: var(--color-background-button);
  color: var(--color-text-secondary);
  border: none;
  border-radius: var(--border-radius-sm);
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.period-selector button:hover {
  background-color: var(--color-background-button-hover);
}

.period-selector button.active {
  background-color: var(--color-primary);
  color: white;
}
</style>