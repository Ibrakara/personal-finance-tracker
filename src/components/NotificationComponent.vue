<template>
  <div class="fixed bottom-10 right-10 z-50 flex flex-col gap-2">
    <div
      v-for="(notification, index) in notifications"
      :key="notification.id"
      :data-test="`notification-message-${index}`"
      :class="[
        'relative px-4 py-3 rounded-lg shadow-md text-white transition-all transform duration-900 ease-in-out',
        notification.type === 'success' && 'bg-green-500',
        notification.type === 'error' && 'bg-red-500',
        notification.type === 'info' && 'bg-blue-500',
        notification.type === 'warning' && 'bg-yellow-500 text-gray-900',
      ]"
    >
      {{ notification.message }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useNotificationStore } from '@/stores/notifiationStore'

const store = useNotificationStore()
const notifications = computed(() => store.notifications)
</script>
