<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavbarComponent from '@/components/NavbarComponent.vue'
import NotificationComponent from '@/components/NotificationComponent.vue'
</script>
<template>
  <NavbarComponent />
  <RouterView class="mt-40" />
  <NotificationComponent />
</template>
<style scoped></style>
