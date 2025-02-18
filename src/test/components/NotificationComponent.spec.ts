import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import NotificationComponent from '@/components/NotificationComponent.vue'
import { useNotificationStore } from '@/stores/notifiationStore'
import { nextTick } from 'vue'

describe('NotificationComponent Component', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders no notifications initially', () => {
    const wrapper = mount(NotificationComponent)
    expect(wrapper.findAll('[data-test^="notification-message"]').length).toBe(0)
  })

  it('renders notifications when store has data', async () => {
    const store = useNotificationStore()
    store.addNotification('Test Success', 'success')
    store.addNotification('Test Error', 'error')

    const wrapper = mount(NotificationComponent)
    await nextTick()

    const notifications = wrapper.findAll('[data-test^="notification-message"]')
    expect(notifications.length).toBe(2)
    expect(notifications[0].text()).toBe('Test Success')
    expect(notifications[1].text()).toBe('Test Error')
  })

  it('applies correct class based on notification type', async () => {
    const store = useNotificationStore()
    store.addNotification('Info Message', 'info')

    const wrapper = mount(NotificationComponent)
    await nextTick()

    const notification = wrapper.find('[data-test="notification-message-0"]')
    expect(notification.classes()).toContain('bg-blue-500')
  })

  it('removes notification after timeout', async () => {
    vi.useFakeTimers()
    const store = useNotificationStore()
    store.addNotification('Temporary Message', 'info')

    const wrapper = mount(NotificationComponent)
    await nextTick()
    expect(wrapper.findAll('[data-test^="notification-message"]').length).toBe(1)

    vi.advanceTimersByTime(2000)
    await nextTick()
    expect(wrapper.findAll('[data-test^="notification-message"]').length).toBe(0)

    vi.useRealTimers()
  })
})
