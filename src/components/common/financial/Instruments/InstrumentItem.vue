<template>
  <tr
    :class="{ selected: isSelected }"
    @click="$emit('click', instrument)"
  >
    <td class="instrument-name">
      <span class="symbol">{{ instrument.symbol }}</span>
      <span class="name">{{ instrument.name }}</span>
    </td>
    <td class="last-price">{{ formatCurrency(instrument.lastPrice) }}</td>
    <td :class="['variation', variationClass]">
      {{ formatVariation(instrument.variation) }}
    </td>
    <td class="volume">{{ formatVolume(instrument.volume) }}</td>
  </tr>
</template>

<script setup>
import { computed } from 'vue'
import { formatCurrency, formatVariation, formatVolume } from '@/utils/formatters'

const props = defineProps({
  instrument: {
    type: Object,
    required: true
  },
  isSelected: {
    type: Boolean,
    default: false
  }
})

const variationClass = computed(() => 
  props.instrument.variation >= 0 ? 'positive' : 'negative'
)
</script>

<style scoped>
td {
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);
}

.selected {
  background-color: var(--color-background-table-row-selected) !important;
}

.instrument-name {
  display: flex;
  flex-direction: column;
}

.symbol {
  font-weight: 600;
  color: var(--color-text-primary);
}

.name {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.last-price {
  font-weight: 500;
}

.variation {
  font-weight: 500;
}

.positive {
  color: var(--color-positive);
}

.negative {
  color: var(--color-negative);
}

.volume {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}
</style>