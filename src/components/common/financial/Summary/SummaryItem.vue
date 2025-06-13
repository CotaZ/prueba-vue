<template>
  <div class="summary-item">
    <span class="label">{{ label }}</span>
    <span class="value">{{ formatter(value) }}</span>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  value: {
    type: [Number, String],
    required: true
  },
  formatter: {
    type: Function,
    default: (val) => val
  }
})
</script>

<style scoped>
.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.label {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.value {
  font-weight: 500;
  color: var(--color-text-primary);
}
</style>