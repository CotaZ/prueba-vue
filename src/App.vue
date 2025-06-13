<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useInstrumentStore } from '@/stores/modules/instruments.store'
import HeaderComponent from './components/common/financial/Header/HeaderComponent.vue'
import TabComponent from './components/common/financial/Tabs/TabComponent.vue'
import SearchBar from './components/common/financial/Search/SearchBar.vue'
import InstrumentList from './components/common/financial/Instruments/InstrumentList.vue'
import ChartComponent from './components/common/financial/Chart/ChartComponent.vue'
import SummaryComponent from './components/common/financial/Summary/SummaryComponent.vue' // Cambiado de SummaryCard a SummaryComponent

import IconChart from '@/components/icons/IconChart.vue'
import IconList from '@/components/icons/IconList.vue'
import IconAlert from '@/components/icons/IconAlert.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import IconFilter from '@/components/icons/IconFilter.vue'

const store = useInstrumentStore()

onMounted(() => {
  store.loadInitialData()
})
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', Arial, sans-serif;
  background: #f8f9fa;
  color: #343a40;
}
</style>