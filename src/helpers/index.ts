import type { EXPENSE_CATAGORIES, INCOME_CATAGORIES, Transaction, TRANSACTION_TYPE } from '@/types'

export const capitalizeFirstLetter = (value: string | unknown) => {
  if (typeof value === 'string') {
    return value ? value[0].toUpperCase() + value.substring(1)?.toLowerCase() : ''
  }
  return ''
}
export const formatDate = (date: Date | string): string => {
  const dateString = new Date(date)
  if (isNaN(dateString.getTime())) {
    throw new Error('Invalid date format')
  }

  const day = String(dateString.getDate()).padStart(2, '0')
  const month = String(dateString.getMonth() + 1).padStart(2, '0')
  const year = dateString.getFullYear()

  return `${day}-${month}-${year}`
}
export function populateCategoryMapByTransactionType(
  transactionType: TRANSACTION_TYPE,
  transactionList: Transaction[],
) {
  const categoryMap: Map<INCOME_CATAGORIES | EXPENSE_CATAGORIES, number> = new Map()
  transactionList.forEach((transaction) => {
    if (transaction.type === transactionType) {
      const category = transaction.category
      if (categoryMap.has(category)) {
        const categoryPreviousAmount = categoryMap.get(category)
        const categoryTotalAmount = categoryPreviousAmount! + transaction.amount
        categoryMap.set(category, categoryTotalAmount)
      } else {
        categoryMap.set(category, transaction.amount)
      }
    }
  })
  return categoryMap
}
export function getRandomHexColorListByCount(count: number): string[] {
  const MAX_HEX_COLOR = 16_777_215
  return Array.from(
    { length: count },
    () =>
      `#${Math.floor(Math.random() * MAX_HEX_COLOR)
        .toString(16)
        .padStart(6, '0')}`,
  )
}
