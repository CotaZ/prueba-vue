<template>
  <div v-if="summary" class="index-summary">
    <h3 class="index-summary__title">{{ selected?.index || 'Índice' }}</h3>
    <p class="index-summary__datetime">{{ datetimeNow }}</p>

    <table class="index-summary__table">
  <tbody>
    <tr>
      <td>Apertura</td>
      <td>${{ summary.price.openPrice }}</td>
    </tr>
    <tr>
      <td>Cierre anterior</td>
      <td>${{ summary.price.closePrice }}</td>
    </tr>
    <tr>
      <td>Máximo diario</td>
      <td>${{ summary.price.maxDay }}</td>
    </tr>
    <tr>
      <td>Mínimo diario</td>
      <td>${{ summary.price.minDay }}</td>
    </tr>
    <tr>
      <td>Máximo 52 semanas</td>
      <td>${{ summary.price.maxW52 }}</td>
    </tr>
    <tr>
      <td>Mínimo 52 semanas</td>
      <td>${{ summary.price.minW52 }}</td>
    </tr>
  </tbody>
</table>


    <h4 class="index-summary__subtitle">Variación</h4>
    <ul class="index-summary__list">
      <li><strong>1 MES:</strong> <span :class="color(summary.pct1M)">{{ summary.pct1M }}%</span></li>
      <li><strong>1 AÑO:</strong> <span :class="color(summary.pct1Y)">{{ summary.pct1Y }}%</span></li>
      <li><strong>AÑO A LA FECHA:</strong> <span :class="color(summary.pctYTD)">{{ summary.pctYTD }}%</span></li>
    </ul>
  </div>
  <div v-else class="index-summary--empty">
    <p>Selecciona un instrumento para ver detalles del índice.</p>
  </div>
</template>

<script>
import { useInstrumentStore } from '../store/useInstrumentStore'

export default {
  setup() {
    const store = useInstrumentStore()

    const datetimeNow = new Date().toLocaleString()

    function color(value) {
      if (value > 0) return 'positive'
      if (value < 0) return 'negative'
      return ''
    }

    return {
      summary: store.summary,
      selected: store.selectedInstrument,
      datetimeNow,
      color
    }
  }
}
</script>
