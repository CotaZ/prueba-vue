<template>
  <tr :class="{ selected: isSelected }" @click="handleSelect">
    <td>{{ instrument.name }}</td>
    <td>{{ formatCurrency(instrument.lastPrice) }}</td>
    <td>{{ formatNumber(instrument.volume) }}</td>
    <td :class="variationClass(instrument.variation)">{{ formatVariation(instrument.variation) }}</td>
    <td>{{ formatVariation(instrument.var30d) }}</td>
    <td>{{ formatVariation(instrument.varYTD) }}</td>
    <td>{{ formatVariation(instrument.var12m) }}</td>
  </tr>
</template>

<script setup>
import { computed } from 'vue'
import { formatCurrency, formatVariation, formatNumber } from '@/utils/formatters'

const props = defineProps({
  instrument: { type: Object, required: true },
  isSelected: { type: Boolean, default: false }
})

const emit = defineEmits(['select'])

function handleSelect() {
  emit('select', props.instrument)
}

function variationClass(value) {
  return value >= 0 ? 'positive' : 'negative'
}
</script>

<style scoped>
.selected {
  background: #31363b !important;
}
.positive {
  color: #10b981;
  font-weight: 600;
}
.negative {
  color: #ef4444;
  font-weight: 600;
}
</style>