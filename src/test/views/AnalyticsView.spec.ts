import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import Analytics from '@/views/AnalyticsView.vue'
import CardComponent from '@/components/CardComponent.vue'
import { useTransactionStore } from '@/stores/transactionStore'
import { EXPENSE_CATAGORIES, INCOME_CATAGORIES, TRANSACTION_TYPE } from '@/types'
import { Doughnut } from 'vue-chartjs'

const mockLocalStorage = (function () {
  let store: Record<string, string> = {}
  return {
    getItem(key: string) {
      return store[key] || null
    },
    setItem(key: string, value: string) {
      store[key] = value
    },
    removeItem(key: string) {
      delete store[key]
    },
    clear() {
      store = {}
    },
    length: 0,
    key() {
      return ''
    },
  }
})()

globalThis.localStorage = mockLocalStorage

// Mock Doughnut component
vi.mock('vue-chartjs', () => ({
  Doughnut: {
    props: ['data', 'options'],
    template: '<div></div>',
  },
}))

describe('Analytics.vue', () => {
  let store: ReturnType<typeof useTransactionStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useTransactionStore()

    store.transactionList = [
      {
        id: '1',
        category: EXPENSE_CATAGORIES.GROCERIES,
        type: TRANSACTION_TYPE.EXPENSE,
        amount: 3000,
        date: '2025-02-17',
      },
      {
        id: '2',
        category: INCOME_CATAGORIES.SALARY,
        type: TRANSACTION_TYPE.INCOME,
        amount: 5000,
        date: '2025-02-18',
      },
    ]
    store.setLocalStorage()
  })
  afterEach(() => {
    localStorage.clear()
  })
  it('should correctly compute total income and expense', () => {
    expect(store.totalIncome).toBe(5000)
    expect(store.totalExpense).toBe(3000)
  })

  it('renders correctly and shows the total income, expense, and balance cards', async () => {
    const wrapper = mount(Analytics, {
      global: {
        plugins: [createPinia()],
      },
    })
    store.getFromLocalStorage()

    await flushPromises()
    await wrapper.vm.$nextTick()

    const incomeCard = wrapper.findAllComponents(CardComponent)[0]
    const expenseCard = wrapper.findAllComponents(CardComponent)[1]
    const balanceCard = wrapper.findAllComponents(CardComponent)[2]

    expect(incomeCard.isVisible()).toBe(true)
    expect(expenseCard.isVisible()).toBe(true)
    expect(balanceCard.isVisible()).toBe(true)

    expect(incomeCard.props('description')).toBe('5000 TL')
    expect(expenseCard.props('description')).toBe('3000 TL')
    expect(balanceCard.props('description')).toBe('2000 TL')
  })
  it('passes correct data to Doughnut chart for Income and Expense categories', async () => {
    const wrapper = mount(Analytics, {
      global: {
        plugins: [createPinia()],
      },
    })

    store.getFromLocalStorage()

    await flushPromises()
    await wrapper.vm.$nextTick()

    // Check Doughnut chart data
    const doughnutCharts = wrapper.findAllComponents(Doughnut)
    expect(doughnutCharts).toHaveLength(2)

    const incomeChartData = doughnutCharts[0].props('data')
    const expenseChartData = doughnutCharts[1].props('data')

    expect(incomeChartData.labels).toEqual([INCOME_CATAGORIES.SALARY])
    expect(incomeChartData.datasets[0].data).toEqual([5000])

    expect(expenseChartData.labels).toEqual([EXPENSE_CATAGORIES.GROCERIES])
    expect(expenseChartData.datasets[0].data).toEqual([3000])
  })
})
