<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavbarComponent from '@/components/NavbarComponent.vue'
</script>
<template>
  <NavbarComponent />
  <RouterView class="mt-40" />
</template>
<style scoped></style>
