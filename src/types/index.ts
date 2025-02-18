export type Transaction = {
  id: string
  amount: number
  type: TRANSACTION_TYPE
  date: string
  category: EXPENSE_CATAGORIES | INCOME_CATAGORIES
}
export enum TRANSACTION_TYPE {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}
export enum EXPENSE_CATAGORIES {
  HOUSING = 'HOUSING',
  UTILITIES = 'UTILITIES',
  GROCERIES = 'GROCERIES',
  TRANSPORTATION = 'TRANSPORTATION',
  INSURANCE = 'INSURANCE',
  HEALTHCARE = 'HEALTHCARE',
  DINING_OUT = 'DINING_OUT',
  ENTERTAINMENT = 'ENTERTAINMENT',
  SHOPPING = 'SHOPPING',
  TRAVEL = 'TRAVEL',
  HOBBIES = 'HOBBIES',
  OTHER = 'OTHER',
}
export enum INCOME_CATAGORIES {
  SALARY = 'SALARY',
  FREELANCE = 'FREELANCE',
  INVESMENT = 'INVESMENT',
  BONUS = 'BONUS',
  GIFT = 'GIFT',
  OTHER = 'OTHER',
}

export type Notification = {
  id: number
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
}
