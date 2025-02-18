import { defineStore } from 'pinia'
import type { Notification } from '@/types'
import { ref } from 'vue'

export const useNotificationStore = defineStore('notifications', () => {
  //states
  const notifications = ref<Notification[]>([])
  //methods
  function addNotification(message: string, type: Notification['type'] = 'info') {
    const id = Date.now()
    notifications.value.push({ id, message, type })
    setTimeout(() => removeNotification(id), 2000)
  }
  function removeNotification(id: number) {
    notifications.value = notifications.value.filter((n) => n.id !== id)
  }
  return {
    notifications,
    addNotification,
    removeNotification,
  }
})
