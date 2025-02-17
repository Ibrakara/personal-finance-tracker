import { describe, it, expect } from 'vitest'
import {
  capitalizeFirstLetter,
  formatDate,
  populateCategoryMapByTransactionType,
  getRandomHexColorListByCount,
} from '@/helpers'
import { EXPENSE_CATAGORIES, INCOME_CATAGORIES, type Transaction, TRANSACTION_TYPE } from '@/types'

const transactionList: Transaction[] = [
  {
    id: '0',
    type: TRANSACTION_TYPE.INCOME,
    category: INCOME_CATAGORIES.SALARY,
    amount: 5000,
    date: '2025-01-01',
  },
  {
    id: '1',
    type: TRANSACTION_TYPE.EXPENSE,
    category: EXPENSE_CATAGORIES.GROCERIES,
    amount: 100,
    date: '2025-01-02',
  },
  {
    id: '2',
    type: TRANSACTION_TYPE.INCOME,
    category: INCOME_CATAGORIES.INVESMENT,
    amount: 2000,
    date: '2025-01-03',
  },
  {
    id: '3',
    type: TRANSACTION_TYPE.EXPENSE,
    category: EXPENSE_CATAGORIES.GROCERIES,
    amount: 150,
    date: '2025-01-04',
  },
]

describe('Helper Functions', () => {
  describe('capitalizeFirstLetter', () => {
    it('should capitalize the first letter of a string and lowercase the rest', () => {
      expect(capitalizeFirstLetter('hello')).toBe('Hello')
      expect(capitalizeFirstLetter('hElLo')).toBe('Hello')
      expect(capitalizeFirstLetter('HELLO')).toBe('Hello')
      expect(capitalizeFirstLetter('HELLO WORlD')).toBe('Hello world')
      expect(capitalizeFirstLetter('')).toBe('')
      expect(capitalizeFirstLetter(null)).toBe('')
      expect(capitalizeFirstLetter(undefined)).toBe('')
    })
  })

  describe('formatDate', () => {
    it('should format a valid date correctly as DD-MM-YYYY', () => {
      expect(formatDate('2025-01-01')).toBe('01-01-2025')
      expect(formatDate(new Date('2025-01-01'))).toBe('01-01-2025')
    })

    it('should throw an error for invalid date format', () => {
      expect(() => formatDate('invalid-date')).toThrow('Invalid date format')
    })
  })

  describe('populateCategoryMapByTransactionType', () => {
    it('should return a map with categories and their total amounts for a given transaction type', () => {
      const incomeMap = populateCategoryMapByTransactionType(
        TRANSACTION_TYPE.INCOME,
        transactionList,
      )
      expect(incomeMap.get(INCOME_CATAGORIES.SALARY)).toBe(5000)
      expect(incomeMap.get(INCOME_CATAGORIES.INVESMENT)).toBe(2000)

      const expenseMap = populateCategoryMapByTransactionType(
        TRANSACTION_TYPE.EXPENSE,
        transactionList,
      )
      expect(expenseMap.get(EXPENSE_CATAGORIES.GROCERIES)).toBe(250)
    })

    it('should return an empty map if no transactions match the given type', () => {
      const expenseMap = populateCategoryMapByTransactionType(TRANSACTION_TYPE.EXPENSE, [])
      expect(expenseMap.size).toBe(0)
    })
  })

  describe('getRandomHexColorListByCount', () => {
    it('should return a list of random hex colors of the specified count', () => {
      const colorList = getRandomHexColorListByCount(5)
      expect(colorList).toHaveLength(5)
      colorList.forEach((color) => {
        expect(color).toMatch(/^#[0-9a-fA-F]{6}$/)
      })
    })

    it('should return an empty array if the count is zero', () => {
      const colorList = getRandomHexColorListByCount(0)
      expect(colorList).toHaveLength(0)
    })

    it('should return different colors for different calls', () => {
      const colorList1 = getRandomHexColorListByCount(5)
      const colorList2 = getRandomHexColorListByCount(5)
      expect(colorList1).not.toEqual(colorList2)
    })
  })
})
