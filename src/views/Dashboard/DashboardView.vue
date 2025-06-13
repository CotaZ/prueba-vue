<template>
  <div class="dashboard-view">
    <!-- Barra superior con título y controles -->
    <div class="dashboard-header">
      <div class="header-left">
        <h1 class="dashboard-title">
          {{ currentIndex.name }}
          <span :class="['variation', variationClass]">
            {{ formatVariation(currentIndex.variation) }}
          </span>
        </h1>
        <p class="last-update">
          Última actualización: {{ formatDateTime(currentIndex.lastUpdate) }}
        </p>
      </div>
      
      <div class="header-actions">
        <PeriodSelector />
        <RefreshButton @click="refreshData" />
      </div>
    </div>

    <!-- Contenido principal del dashboard -->
    <div class="dashboard-content">
      <!-- Panel izquierdo: Búsqueda y lista -->
      <div class="left-panel">
        <SearchBar />
        <InstrumentTabs />
        <InstrumentList />
      </div>
      
      <!-- Panel derecho: Gráfico y detalles -->
      <div class="right-panel">
        <FinancialChart />
        <InstrumentSummary />
        <MarketIndicators v-if="!isMobile" />
      </div>
    </div>

    <!-- Menú inferior para móviles -->
    <MobileNav v-if="isMobile" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useInstrumentStore } from '@/stores/modules/instruments.store'
import { useResponsive } from '@/composables/useResponsive'
import { formatVariation, formatDateTime } from '@/utils/formatters'

// Components
import PeriodSelector from '@/components/financial/PeriodSelector.vue'
import RefreshButton from '@/components/ui/RefreshButton.vue'
import SearchBar from '@/components/financial/SearchBar.vue'
import InstrumentTabs from '@/components/financial/InstrumentTabs.vue'
import InstrumentList from '@/components/financial/InstrumentList.vue'
import FinancialChart from '@/components/financial/FinancialChart.vue'
import InstrumentSummary from '@/components/financial/InstrumentSummary.vue'
import MarketIndicators from '@/components/financial/MarketIndicators.vue'
import MobileNav from '@/components/financial/MobileNav.vue'

const store = useInstrumentStore()
const { isMobile } = useResponsive()

const currentIndex = computed(() => store.currentIndex)
const variationClass = computed(() => 
  currentIndex.value.variation >= 0 ? 'positive' : 'negative'
)

const refreshData = () => {
  store.loadInitialData()
}
</script>

<style lang="scss" scoped>
@import '@/styles/base/variables';

.dashboard-view {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  gap: 1.5rem;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);

  .header-left {
    .dashboard-title {
      font-size: 1.75rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 0.5rem;
    }

    .last-update {
      color: var(--color-text-secondary);
      font-size: 0.875rem;
    }
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
}

.dashboard-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  height: calc(100vh - 180px);

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    height: auto;
  }
}

.left-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
}

.right-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (max-width: 1024px) {
    position: sticky;
    bottom: 0;
    background: var(--color-background-card);
    padding: 1rem;
    border-radius: $border-radius;
    margin-top: 1rem;
  }
}

.variation {
  font-size: 1rem;
  padding: 0.25rem 0.75rem;
  border-radius: $border-radius-sm;
  font-weight: 500;

  &.positive {
    background-color: var(--color-positive-bg);
    color: var(--color-positive);
  }

  &.negative {
    background-color: var(--color-negative-bg);
    color: var(--color-negative);
  }
}

@media (max-width: 768px) {
  .dashboard-view {
    padding: 1rem;
  }
  
  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>