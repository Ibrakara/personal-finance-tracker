<template>
  <div class="w-xl bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden">
    <div class="p-4 flex justify-center items-center flex-col">
      <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
      <p v-if="description" class="text-gray-600 mt-2">{{ description }}</p>
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
interface CardProps {
  title: string
  description?: string
  imageUrl?: string
}
defineProps<CardProps>()
</script>
