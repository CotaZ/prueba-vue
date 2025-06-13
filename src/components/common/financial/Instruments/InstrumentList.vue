<template>
  <div class="instrument-list">
    <InstrumentTable :instruments="filteredInstruments" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useInstrumentStore } from '@/stores/modules/instruments.store'
import InstrumentTable from './InstrumentTable.vue'

const store = useInstrumentStore()

const filteredInstruments = computed(() => {
  return store.filteredInstruments
})
</script>

<style scoped>
.instrument-list {
  background-color: var(--color-background-card);
  border-radius: var(--border-radius);
  overflow: hidden;
}
</style>