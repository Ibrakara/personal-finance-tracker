// tests/useNotificationStore.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useNotificationStore } from '@/stores/notifiationStore'

describe('Notification Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should add a notification', () => {
    const store = useNotificationStore()
    store.addNotification('Test Message', 'success')

    expect(store.notifications.length).toBe(1)
    expect(store.notifications[0]).toMatchObject({
      message: 'Test Message',
      type: 'success',
    })
  })

  it('should remove a notification', () => {
    const store = useNotificationStore()
    store.addNotification('Temporary Message', 'info')
    const notificationId = store.notifications[0].id

    store.removeNotification(notificationId)

    expect(store.notifications.length).toBe(0)
  })

  it('should automatically remove a notification after 2 seconds', async () => {
    vi.useFakeTimers()
    const store = useNotificationStore()

    store.addNotification('Auto-remove message', 'info')
    expect(store.notifications.length).toBe(1)

    vi.advanceTimersByTime(2000)
    expect(store.notifications.length).toBe(0)

    vi.useRealTimers()
  })
})
