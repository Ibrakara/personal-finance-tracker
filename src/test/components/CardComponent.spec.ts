import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Card from '@/components/CardComponent.vue'

describe('Card.vue', () => {
  it('renders the card with title and description', () => {
    const wrapper = mount(Card, {
      props: {
        title: 'Card Title',
        description: 'This is a card description.',
      },
    })

    expect(wrapper.find('h3').text()).toBe('Card Title')
    expect(wrapper.find('p').text()).toBe('This is a card description.')
  })

  it('renders slot content correctly', () => {
    const wrapper = mount(Card, {
      props: { title: 'Test Card' },
      slots: {
        default: '<button>Click Me</button>',
      },
    })

    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('button').text()).toBe('Click Me')
  })

  it('renders without a description when not provided', () => {
    const wrapper = mount(Card, {
      props: { title: 'No Description Card' },
    })

    expect(wrapper.find('h3').text()).toBe('No Description Card')
    expect(wrapper.find('p').exists()).toBe(false)
  })
})
