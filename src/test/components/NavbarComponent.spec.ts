import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import Navigation from '@/components/NavbarComponent.vue'

// Mock Router
const routes = [
  { path: '/', component: { template: '<div>Analytics</div>' } },
  { path: '/create', component: { template: '<div>Create Transaction</div>' } },
  { path: '/list', component: { template: '<div>Transaction List</div>' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

describe('Navigation.vue', () => {
  it('renders navigation links correctly', async () => {
    router.push('/')
    await router.isReady()

    const wrapper = mount(Navigation, {
      global: { plugins: [router] },
    })

    const links = wrapper.findAll('a')
    expect(links).toHaveLength(3)
    expect(links[0].text()).toBe('Analytics')
    expect(links[1].text()).toBe('Create Transaction')
    expect(links[2].text()).toBe('Transaction List')
  })

  it('toggles mobile menu on button click', async () => {
    const wrapper = mount(Navigation, { global: { plugins: [router] } })

    const menuPopup = '[data-test="navbar-component-popup-container"]'

    expect(wrapper.find(menuPopup).exists()).toBe(false)

    const menuButton = wrapper.find('button')
    await menuButton.trigger('click')

    expect(wrapper.find(menuPopup).exists()).toBe(true)

    await menuButton.trigger('click')
    expect(wrapper.find(menuPopup).exists()).toBe(false)
  })

  it('closes mobile menu when a link is clicked', async () => {
    const wrapper = mount(Navigation, { global: { plugins: [router] } })

    await wrapper.find('button').trigger('click')
    expect(wrapper.find('[data-test="navbar-component-popup-container"]').exists()).toBe(true)

    const firstLink = wrapper.find('[data-test="mobile-link-0"]')
    await firstLink.trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-test="navbar-component-popup-container"]').exists()).toBe(false)
  })
})
