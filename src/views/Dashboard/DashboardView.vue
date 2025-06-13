<template>
  <div class="dashboard-view">
    <SearchBar />
    <div class="dashboard-content">
      <div class="left-panel">
        <HeaderComponent />
        <TabComponent />
        <ChartComponent />
        <InstrumentList />
      </div>
      <div class="right-panel">
        <SummaryComponent />
      </div>
    </div>
  </div>
</template>

<script setup>
import SearchBar from '@/components/common/financial/Search/SearchBar.vue'
import HeaderComponent from '@/components/common/financial/Header/HeaderComponent.vue'
import TabComponent from '@/components/common/financial/Tabs/TabComponent.vue'
import ChartComponent from '@/components/common/financial/Chart/ChartComponent.vue'
import InstrumentList from '@/components/common/financial/Instruments/InstrumentList.vue'
import SummaryComponent from '@/components/common/financial/Summary/SummaryComponent.vue'
</script>

<style lang="scss" scoped>
@use '@/styles/base/variables' as vars;

.dashboard-view {
  min-height: 100vh;
  background: #181c20;
  color: #fff;
  font-family: 'Inter', Arial, sans-serif;
  padding: 0;
}

.dashboard-content {
  display: flex;
  gap: 2rem;
  padding: 1.5rem 2rem;
}

.left-panel {
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.right-panel {
  flex: 1;
  background: #23272b;
  border-radius: 8px;
  padding: 1.5rem;
  min-width: 320px;
}
</style>