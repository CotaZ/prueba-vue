<template>
  <table class="instrument-table">
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Último</th>
        <th>Monto (MM)</th>
        <th>Var día</th>
        <th>Var 30d</th>
        <th>Año Actual</th>
        <th>12 Meses</th>
      </tr>
    </thead>
    <tbody>
      <InstrumentItem
        v-for="instrument in filteredInstruments"
        :key="instrument.symbol"
        :instrument="instrument"
        :is-selected="selectedInstrument?.symbol === instrument.symbol"
        @select="selectInstrument"
      />
    </tbody>
  </table>
</template>

<script setup>
import { computed } from 'vue'
import { useInstrumentStore } from '@/stores/modules/instruments.store'
import InstrumentItem from './InstrumentItem.vue'

const store = useInstrumentStore()
const filteredInstruments = computed(() => store.filteredInstruments)
const selectedInstrument = computed(() => store.selectedInstrument)

function selectInstrument(instrument) {
  store.setSelectedInstrument(instrument)
}
</script>

<style scoped>
.instrument-table {
  width: 100%;
  border-collapse: collapse;
  background: #23272b;
  color: #fff;
  border-radius: 8px;
  overflow: hidden;
}

.instrument-table th, .instrument-table td {
  padding: 0.75rem 0.5rem;
  text-align: center;
  font-size: 0.95rem;
}

.instrument-table th {
  background: #181c20;
  color: #b0b3b8;
  font-weight: 600;
  text-transform: uppercase;
}

.instrument-table tbody tr {
  transition: background 0.2s;
}

.instrument-table tbody tr.selected,
.instrument-table tbody tr:hover {
  background: #31363b;
  cursor: pointer;
}
</style>