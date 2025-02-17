import { flushPromises, mount, VueWrapper } from '@vue/test-utils'
import ListView from '@/views/ListView.vue'
import CustomInput from '@/components/CustomInput.vue'
import CustomTable from '@/components/CustomTable.vue'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useTransactionStore } from '@/stores/transactionStore'
import { EXPENSE_CATAGORIES, INCOME_CATAGORIES, TRANSACTION_TYPE } from '@/types'

describe('TransactionList.vue', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let wrapper: VueWrapper<any, any>
  let store: ReturnType<typeof useTransactionStore>

  const mockTransactionList = [
    {
      id: '1',
      date: '2025-02-01',
      type: TRANSACTION_TYPE.EXPENSE,
      amount: 1000,
      category: EXPENSE_CATAGORIES.GROCERIES,
    },
    {
      id: '2',
      date: '2025-02-10',
      type: TRANSACTION_TYPE.INCOME,
      amount: 5000,
      category: INCOME_CATAGORIES.SALARY,
    },
    {
      id: '3',
      date: '2025-02-20',
      type: TRANSACTION_TYPE.EXPENSE,
      amount: 2000,
      category: EXPENSE_CATAGORIES.TRAVEL,
    },
  ]

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useTransactionStore()
    store.$state.transactionList = [
      {
        id: '1',
        date: '2025-02-01',
        type: TRANSACTION_TYPE.EXPENSE,
        amount: 1000,
        category: EXPENSE_CATAGORIES.GROCERIES,
      },
      {
        id: '2',
        date: '2025-02-10',
        type: TRANSACTION_TYPE.INCOME,
        amount: 5000,
        category: INCOME_CATAGORIES.SALARY,
      },
      {
        id: '3',
        date: '2025-02-20',
        type: TRANSACTION_TYPE.EXPENSE,
        amount: 2000,
        category: EXPENSE_CATAGORIES.TRAVEL,
      },
    ]

    wrapper = mount(ListView, {
      global: {
        components: {
          CustomInput,
          CustomTable,
        },
        mocks: {
          $store: {
            getTransactionList: mockTransactionList,
          },
        },
      },
    })
  })

  it('should render the component correctly', () => {
    expect(wrapper.find('h5').text()).toBe('Transaction List')
    expect(wrapper.find('h2').text()).toBe('Filter Transaction')
  })

  it('should filter transactions by start and end date', async () => {
    const startDateInput = wrapper.findAllComponents(CustomInput).at(0)
    const endDateInput = wrapper.findAllComponents(CustomInput).at(1)

    await startDateInput!.setValue('2025-01-01')
    await endDateInput!.setValue('2025-02-20')

    await flushPromises()
    await wrapper.vm.$nextTick()

    const filteredTransactions = wrapper.vm.transactionListByDate

    expect(filteredTransactions.length).toBe(3)
    expect(filteredTransactions[0].date).toBe('2025-02-01')
    expect(filteredTransactions[1].date).toBe('2025-02-10')
    expect(filteredTransactions[2].date).toBe('2025-02-20')
  })

  it('should update current page when page is changed', async () => {
    const customTable = wrapper.findComponent(CustomTable)
    customTable.vm.$emit('update:currentPage', 2)

    expect(wrapper.vm.currentPage).toBe(2)
  })

  it('should call deleteTransaction when delete event is emitted', async () => {
    const deleteSpy = vi.fn()
    wrapper.vm.deleteTransaction = deleteSpy

    const customTable = wrapper.findComponent(CustomTable)
    customTable.vm.$emit('onDelete', 1)

    expect(deleteSpy).toHaveBeenCalledWith(1)
  })

  it('should correctly compute total pages', () => {
    const totalPages = wrapper.vm.totalPages
    expect(totalPages).toBe(1) // Since we have 4 transactions and 10 per page
  })
})
