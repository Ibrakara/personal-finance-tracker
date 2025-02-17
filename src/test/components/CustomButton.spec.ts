import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CustomButton from '@/components/CustomButton.vue'

describe('CustomButton.vue', () => {
  it('renders the button with default slot content', () => {
    const wrapper = mount(CustomButton, {
      slots: { default: 'Click Me' },
    })

    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.text()).toBe('Click Me')
  })

  it('emits an event when clicked', async () => {
    const wrapper = mount(CustomButton)
    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted()).toHaveProperty('onClick')
    expect(wrapper.emitted('onClick')).toHaveLength(1)
  })

  it('disables the button when the `disabled` prop is true', () => {
    const wrapper = mount(CustomButton, {
      props: { disabled: true },
    })

    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('does not emit an event when disabled and clicked', async () => {
    const wrapper = mount(CustomButton, {
      props: { disabled: true },
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('onClick')).toBeUndefined()
  })
})
