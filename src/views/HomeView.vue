<template>
  <div class="home-view">
    <img src="@/assets/vue.svg" alt="Vue logo" class="vue-logo" />
    <h1>Bienvenido a la aplicación financiera</h1>
    <div class="features">
      <div class="feature">
        <IconChart class="feature-icon" />
        <p>Visualiza gráficos financieros</p>
      </div>
      <div class="feature">
        <IconList class="feature-icon" />
        <p>Consulta listas de instrumentos</p>
      </div>
      <div class="feature">
        <IconAlert class="feature-icon" />
        <p>Recibe alertas importantes</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconChart from '@/components/icons/IconChart.vue'
import IconList from '@/components/icons/IconList.vue'
import IconAlert from '@/components/icons/IconAlert.vue'
</script>

<style lang="scss" scoped>
@use '@/styles/base/variables' as vars;

.vue-logo {
  display: block;
  margin: 2rem auto 1rem auto;
  width: 100px;
  height: auto;
}

.home-view {
  padding: vars.$spacer;
  background: vars.$color-light;
  color: vars.$color-dark;
  min-height: 100vh;

  h1 {
    color: vars.$color-primary;
    margin-bottom: vars.$spacer;
    text-align: center;
  }

  .features {
    display: flex;
    justify-content: center;
    gap: vars.$spacer;

    .feature {
      background: vars.$color-light;
      border: 1px solid vars.$color-primary;
      border-radius: 8px;
      padding: vars.$spacer;
      text-align: center;
      width: 200px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);

      .feature-icon {
        width: 48px;
        height: 48px;
        margin-bottom: vars.$spacer;
        color: vars.$color-primary;
      }

      p {
        margin: 0;
        color: vars.$color-dark;
      }
    }
  }
}
</style>