import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CustomInput from '@/components/CustomInput.vue'

describe('CustomInput.vue', () => {
  it('renders the input with the correct label', () => {
    const wrapper = mount(CustomInput, {
      props: { label: 'Username', type: 'text' },
    })

    const label = wrapper.find('label')
    expect(label.exists()).toBe(true)
    expect(label.text()).toBe('Username')
  })

  it('renders the correct placeholder', () => {
    const wrapper = mount(CustomInput, {
      props: { label: 'Email', type: 'email', placeholder: 'Enter your email' },
    })

    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).toBe('Enter your email')
  })

  it('binds and updates v-model correctly', async () => {
    const wrapper = mount(CustomInput, {
      props: { label: 'Password', type: 'password' },
      modelValue: '',
    })

    const input = wrapper.find('input')
    await input.setValue('mysecurepassword')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((wrapper.vm as any).inputModelValue).toBe('mysecurepassword')
  })

  it('displays an error message when provided', () => {
    const wrapper = mount(CustomInput, {
      props: { label: 'Username', type: 'text', error: 'This field is required' },
    })

    const errorSpan = wrapper.find('.form-error')
    expect(errorSpan.exists()).toBe(true)
    expect(errorSpan.text()).toBe('This field is required')
  })

  it('applies min and max attributes when set', () => {
    const wrapper = mount(CustomInput, {
      props: { label: 'Age', type: 'number', min: '18', max: '60' },
    })

    const input = wrapper.find('input')
    expect(input.attributes('min')).toBe('18')
    expect(input.attributes('max')).toBe('60')
  })
})
