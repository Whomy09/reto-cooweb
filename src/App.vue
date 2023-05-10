<script setup lang="ts">
import Navegation from './components/layout/Navegation.vue'
</script>

<template>
  <div id="principal-container">
    <div id="nav">
      <Navegation />
    </div>
    <RouterView />
  </div>
</template>

<style scoped></style>
