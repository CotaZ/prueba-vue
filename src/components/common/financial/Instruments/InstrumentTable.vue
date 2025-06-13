<template>
  <table class="instrument-table">
    <thead>
      <tr>
        <th>Instrumento</th>
        <th>Último</th>
        <th>Var %</th>
        <th>Volumen</th>
      </tr>
    </thead>
    <tbody>
      <InstrumentItem
        v-for="instrument in instruments"
        :key="instrument.symbol"
        :instrument="instrument"
        :is-selected="selectedInstrument?.symbol === instrument.symbol"
        @click="store.selectInstrument(instrument)"
      />
    </tbody>
  </table>
</template>

<script setup>
import { computed } from 'vue'
import { useInstrumentStore } from '@/stores/modules/instruments.store'
import InstrumentItem from './InstrumentItem.vue'

const store = useInstrumentStore()
const selectedInstrument = computed(() => store.selectedInstrument)

defineProps({
  instruments: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.instrument-table {
  width: 100%;
  border-collapse: collapse;
}

.instrument-table th {
  text-align: left;
  padding: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  background-color: var(--color-background-table-header);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.instrument-table tbody tr {
  transition: background-color 0.2s ease;
}

.instrument-table tbody tr:hover {
  background-color: var(--color-background-table-row-hover);
  cursor: pointer;
}
</style>
