import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CustomTable from '@/components/CustomTable.vue'
import { formatDate, capitalizeFirstLetter } from '@/helpers/index'
import { EXPENSE_CATAGORIES, INCOME_CATAGORIES, TRANSACTION_TYPE } from '@/types'

vi.mock('@/helpers/index', () => ({
  formatDate: vi.fn((date) => `formatted-${date}`),
  capitalizeFirstLetter: vi.fn((text) => `capitalized-${text}`),
}))

describe('CustomTable.vue', () => {
  const transactions = [
    {
      id: '1',
      type: TRANSACTION_TYPE.INCOME,
      category: INCOME_CATAGORIES.SALARY,
      date: '2024-02-15',
      amount: 1000,
    },
    {
      id: '2',
      type: TRANSACTION_TYPE.EXPENSE,
      category: EXPENSE_CATAGORIES.GROCERIES,
      date: '2024-02-14',
      amount: 50,
    },
  ]

  it('renders table headers correctly', () => {
    const wrapper = mount(CustomTable, {
      props: { transactionList: transactions, currentPage: 1, totalPages: 3 },
    })

    const headers = wrapper.findAll('thead th')
    const expectedHeaders = ['Type', 'Category', 'Date', 'Amount', 'Actions']

    headers.forEach((header, index) => {
      expect(header.text()).toBe(expectedHeaders[index])
    })
  })

  it('renders transaction data correctly', () => {
    const wrapper = mount(CustomTable, {
      props: { transactionList: transactions, currentPage: 1, totalPages: 3 },
    })

    const rows = wrapper.findAll('tbody tr')
    expect(rows).toHaveLength(transactions.length)

    transactions.forEach((transaction, index) => {
      const cells = rows[index].findAll('td')

      expect(cells[0].text()).toBe(capitalizeFirstLetter(transaction.type))
      expect(cells[1].text()).toBe(capitalizeFirstLetter(transaction.category))
      expect(cells[2].text()).toBe(formatDate(transaction.date))
      expect(cells[3].text()).toBe(`${transaction.amount} TL`)
    })
  })

  it('renders empty state correctly when transaction list is empty', () => {
    const wrapper = mount(CustomTable, {
      props: { transactionList: [], currentPage: 1, totalPages: 1 },
    })

    const emptyRow = wrapper.findAll('tbody tr')
    expect(emptyRow).toHaveLength(1)

    const emptyCells = emptyRow[0].findAll('td')
    expect(emptyCells[0].text()).toBe('-')
    expect(emptyCells[1].text()).toBe('-')
    expect(emptyCells[2].text()).toBe('-')
    expect(emptyCells[3].text()).toBe('- TL')
    expect(emptyCells[4].text()).toBe('-')
  })

  it('emits `onDelete` event when delete button is clicked', async () => {
    const wrapper = mount(CustomTable, {
      props: { transactionList: transactions, currentPage: 1, totalPages: 3 },
    })

    const deleteButtons = wrapper.findAll('img[alt="delete-button"]')
    await deleteButtons[0].trigger('click')

    expect(wrapper.emitted()).toHaveProperty('onDelete')
    expect(wrapper.emitted('onDelete')![0]).toEqual(['1'])
  })

  it('emits `update:currentPage` event when pagination buttons are clicked', async () => {
    const wrapper = mount(CustomTable, {
      props: { transactionList: transactions, currentPage: 2, totalPages: 3 },
    })

    const buttons = wrapper.findAll('button')

    const prevButton = buttons.find((btn) => btn.text() === '« Prev')
    const nextButton = buttons.find((btn) => btn.text() === 'Next »')

    await prevButton?.trigger('click')
    expect(wrapper.emitted('update:currentPage')![0]).toEqual([1])

    await nextButton?.trigger('click')
    expect(wrapper.emitted('update:currentPage')![1]).toEqual([3])
  })
})
