import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useTransactionStore } from '@/stores/transactionStore'
import { EXPENSE_CATAGORIES, INCOME_CATAGORIES, TRANSACTION_TYPE } from '@/types'

// Mocking localStorage
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

// Replace the global localStorage with the mock storage
globalThis.localStorage = mockLocalStorage

describe('transactionStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('should initialize with empty transaction list', () => {
    const store = useTransactionStore()
    expect(store.getTransactionList.length).toBe(0)
  })

  it('should create a new transaction and store it in localStorage', () => {
    const store = useTransactionStore()

    store.transactionFormCategory = EXPENSE_CATAGORIES.GROCERIES
    store.transactionFormType = TRANSACTION_TYPE.EXPENSE
    store.transactionFormAmount = 150
    store.transactionFormDate = '2025-02-17'

    store.createTransaction()

    expect(store.getTransactionList.length).toBe(1)
    const createdTransaction = store.getTransactionList[0]
    expect(createdTransaction.category).toBe(EXPENSE_CATAGORIES.GROCERIES)
    expect(createdTransaction.type).toBe(TRANSACTION_TYPE.EXPENSE)
    expect(createdTransaction.amount).toBe(150)
    expect(createdTransaction.date).toBe('2025-02-17')

    const storedData = JSON.parse(localStorage.getItem('transactionList')!)
    expect(storedData.length).toBe(1)
    expect(storedData[0].category).toBe(EXPENSE_CATAGORIES.GROCERIES)
  })
  it('should set transaction list to localStorage when setLocalStorage is called', () => {
    const store = useTransactionStore()

    // Add some transactions
    store.transactionList.push({
      id: '1',
      category: EXPENSE_CATAGORIES.GROCERIES,
      type: TRANSACTION_TYPE.EXPENSE,
      amount: 50,
      date: '2025-02-17',
    })
    store.transactionList.push({
      id: '2',
      category: INCOME_CATAGORIES.SALARY,
      type: TRANSACTION_TYPE.INCOME,
      amount: 1000,
      date: '2025-02-18',
    })

    // Call the setLocalStorage method to save the transaction list
    store.setLocalStorage()

    // Verify that the data is saved in localStorage
    const storedData = JSON.parse(localStorage.getItem('transactionList')!)
    expect(storedData).toHaveLength(2)
    expect(storedData[0].category).toBe(EXPENSE_CATAGORIES.GROCERIES)
    expect(storedData[1].category).toBe(INCOME_CATAGORIES.SALARY)
  })

  it('should get transaction list from localStorage when getFromLocalStorage is called', () => {
    const store = useTransactionStore()

    // Mock localStorage with a sample transaction list
    const mockData = [
      {
        id: '1',
        category: EXPENSE_CATAGORIES.GROCERIES,
        type: TRANSACTION_TYPE.EXPENSE,
        amount: 50,
        date: '2025-02-17',
      },
      {
        id: '2',
        category: INCOME_CATAGORIES.SALARY,
        type: TRANSACTION_TYPE.INCOME,
        amount: 1000,
        date: '2025-02-18',
      },
    ]
    localStorage.setItem('transactionList', JSON.stringify(mockData))

    // Call the getFromLocalStorage method to load the transaction list
    store.getFromLocalStorage()

    // Verify that the transaction list is loaded correctly
    expect(store.transactionList).toHaveLength(2)
    expect(store.transactionList[0].category).toBe(EXPENSE_CATAGORIES.GROCERIES)
    expect(store.transactionList[1].category).toBe(INCOME_CATAGORIES.SALARY)
  })

  it('should not load transaction list from localStorage if data is not available', () => {
    const store = useTransactionStore()

    // Simulate no data in localStorage
    localStorage.removeItem('transactionList')

    // Call the getFromLocalStorage method
    store.getFromLocalStorage()

    // Verify that the transaction list is still empty
    expect(store.transactionList).toHaveLength(0)
  })

  it('should delete a transaction correctly', () => {
    const store = useTransactionStore()

    store.transactionList.push({
      id: '123',
      category: EXPENSE_CATAGORIES.GROCERIES,
      type: TRANSACTION_TYPE.EXPENSE,
      amount: 100,
      date: '2025-02-17',
    })

    store.deleteTransaction('123')

    expect(store.transactionList.length).toBe(0)
    const storedData = JSON.parse(localStorage.getItem('transactionList')!)
    expect(storedData.length).toBe(0)
  })

  it('should correctly compute total income and expense', () => {
    const store = useTransactionStore()

    store.transactionList.push(
      {
        id: '1',
        category: INCOME_CATAGORIES.SALARY,
        type: TRANSACTION_TYPE.INCOME,
        amount: 3000,
        date: '2025-02-17',
      },
      {
        id: '2',
        category: EXPENSE_CATAGORIES.GROCERIES,
        type: TRANSACTION_TYPE.EXPENSE,
        amount: 200,
        date: '2025-02-17',
      },
    )

    expect(store.totalIncome).toBe(3000)
    expect(store.totalExpense).toBe(200)
  })

  it('should compute balance as total income minus total expense', () => {
    const store = useTransactionStore()

    store.transactionList.push(
      {
        id: '1',
        category: INCOME_CATAGORIES.SALARY,
        type: TRANSACTION_TYPE.INCOME,
        amount: 3000,
        date: '2025-02-17',
      },
      {
        id: '2',
        category: EXPENSE_CATAGORIES.GROCERIES,
        type: TRANSACTION_TYPE.EXPENSE,
        amount: 200,
        date: '2025-02-17',
      },
    )

    expect(store.balance).toBe(2800)
  })

  it('should correctly populate category chart data by transaction type', () => {
    const store = useTransactionStore()

    store.transactionList.push(
      {
        id: '1',
        category: INCOME_CATAGORIES.SALARY,
        type: TRANSACTION_TYPE.INCOME,
        amount: 3000,
        date: '2025-02-17',
      },
      {
        id: '2',
        category: INCOME_CATAGORIES.FREELANCE,
        type: TRANSACTION_TYPE.INCOME,
        amount: 1500,
        date: '2025-02-17',
      },
    )

    const chartData = store.categoryChartDataByType(TRANSACTION_TYPE.INCOME)

    expect(chartData.labels).toEqual([INCOME_CATAGORIES.SALARY, 'FREELANCE'])
    expect(chartData.datasets[0].data).toEqual([3000, 1500])
  })
})
