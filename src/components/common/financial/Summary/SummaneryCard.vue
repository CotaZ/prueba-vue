<template>
  <div class="summary-card">
    <h3 class="summary-title">Resumen</h3>
    <div class="summary-grid">
      <SummaryItem
        v-for="item in summaryItems"
        :key="item.label"
        :label="item.label"
        :value="item.value"
        :formatter="item.formatter"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useInstrumentStore } from '@/stores/modules/instruments.store'
import { formatCurrency, formatNumber } from '@/utils/formatters'
import SummaryItem from './SummaryItem.vue'

const store = useInstrumentStore()

const summaryItems = computed(() => {
  if (!store.selectedInstrument) return []
  
  return [
    { label: 'Apertura', value: store.selectedInstrument.openPrice, formatter: formatCurrency },
    { label: 'Máximo', value: store.selectedInstrument.highPrice, formatter: formatCurrency },
    { label: 'Mínimo', value: store.selectedInstrument.lowPrice, formatter: formatCurrency },
    { label: 'Cierre Anterior', value: store.selectedInstrument.previousClose, formatter: formatCurrency },
    { label: 'Volumen', value: store.selectedInstrument.volume, formatter: formatNumber },
    { label: 'Capitalización', value: store.selectedInstrument.marketCap, formatter: formatCurrency }
  ]
})
</script>

<style scoped>
.summary-card {
  background-color: var(--color-background-card);
  border-radius: var(--border-radius);
  padding: 1.5rem;
}

.summary-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 1.25rem;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}
</style>