import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CustomDropdown from '@/components/CustomDropdown.vue'

describe('CustomDropdown.vue', () => {
  it('renders the dropdown with a label', () => {
    const wrapper = mount(CustomDropdown, {
      props: { name: 'Category', list: ['Option 1', 'Option 2'] },
    })

    const label = wrapper.find('label')
    expect(label.exists()).toBe(true)
    expect(label.text()).toBe('Category')
  })

  it('renders all options from the list', () => {
    const options = ['Apple', 'Banana', 'Cherry']
    const wrapper = mount(CustomDropdown, {
      props: { name: 'Fruits', list: options },
    })

    const renderedOptions = wrapper.findAll('option')
    expect(renderedOptions).toHaveLength(options.length + 1)

    options.forEach((option, index) => {
      expect(renderedOptions[index + 1].text()).toBe(option)
      expect(renderedOptions[index + 1].attributes('value')).toBe(option)
    })
  })

  it('updates v-model when an option is selected', async () => {
    const wrapper = mount(CustomDropdown, {
      props: { name: 'Colors', list: ['Red', 'Green', 'Blue'] },
      modelValue: '',
    })

    const select = wrapper.find('select')
    await select.setValue('Green')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((wrapper.vm as any).selectModelValue).toBe('Green')
  })
})
