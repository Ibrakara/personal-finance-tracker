import { mount } from '@vue/test-utils'
import TransactionFormView from '@/views/TransactionFormView.vue'
import CustomButton from '@/components/CustomButton.vue'
import { createTestingPinia } from '@pinia/testing'
import { describe, expect, it } from 'vitest'
import { useTransactionStore } from '@/stores/transactionStore'
import { EXPENSE_CATAGORIES, TRANSACTION_TYPE } from '@/types'

describe('Form component', () => {
  it('renders the component correctly', () => {
    const wrapper = mount(TransactionFormView, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    })
    expect(wrapper.find('h5').text()).toBe('Create Transaction')
  })
  it('disables the create button when form is incomplete', () => {
    const wrapper = mount(TransactionFormView, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    })
    expect(wrapper.findComponent(CustomButton).props().disabled).toBe(true)
  })
  it('enables the create button when all fields are filled', async () => {
    const wrapper = mount(TransactionFormView, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    })
    const transactionStore = useTransactionStore()

    transactionStore.transactionFormType = TRANSACTION_TYPE.EXPENSE
    transactionStore.transactionFormCategory = EXPENSE_CATAGORIES.HEALTHCARE
    transactionStore.transactionFormAmount = 200
    transactionStore.transactionFormDate = '2021-01-01'

    expect(wrapper.vm.isCreateButtonDisabled).toBe(false)
  })
  it('resets the category value when type changes', async () => {
    const wrapper = mount(TransactionFormView, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    })
    const transactionStore = useTransactionStore()

    transactionStore.transactionFormType = TRANSACTION_TYPE.EXPENSE
    transactionStore.transactionFormCategory = EXPENSE_CATAGORIES.HEALTHCARE

    expect(transactionStore.transactionFormCategory).toEqual(EXPENSE_CATAGORIES.HEALTHCARE)

    transactionStore.transactionFormType = TRANSACTION_TYPE.INCOME
    await wrapper.vm.$nextTick()

    expect(transactionStore.transactionFormCategory).toEqual(undefined)
  })
})
