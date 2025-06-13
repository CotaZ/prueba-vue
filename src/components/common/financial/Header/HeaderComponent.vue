<template>
  <header class="financial-header">
    <div class="header-content">
      <h1 class="index-name">{{ indexData.name }}</h1>
      <div class="index-values">
        <span class="current-value">{{ formatCurrency(indexData.currentValue) }}</span>
        <span :class="['variation', variationClass]">
          {{ formatVariation(indexData.variation) }}
        </span>
      </div>
    </div>
    <div class="header-meta">
      <span class="last-update">Actualizado: {{ formatDateTime(indexData.lastUpdate) }}</span>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useInstrumentStore } from '@/stores/modules/instruments.store'
import { formatCurrency, formatVariation, formatDateTime } from '@/utils/formatters'

const store = useInstrumentStore()

const indexData = computed(() => store.currentIndex)
const variationClass = computed(() => 
  indexData.value.variation >= 0 ? 'positive' : 'negative'
)
</script>

<style scoped>
.financial-header {
  background-color: var(--color-background-header);
  padding: 1.5rem;
  border-radius: var(--border-radius);
  margin-bottom: 1.5rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.index-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.index-values {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.current-value {
  font-size: 1.5rem;
  font-weight: 600;
}

.variation {
  font-size: 1rem;
  padding: 0.25rem 0.5rem;
  border-radius: var(--border-radius-sm);
}

.positive {
  color: var(--color-positive);
  background-color: var(--color-positive-bg);
}

.negative {
  color: var(--color-negative);
  background-color: var(--color-negative-bg);
}

.header-meta {
  text-align: right;
}

.last-update {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}
</style>