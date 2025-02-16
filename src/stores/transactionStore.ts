import { computed, onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import {
  TRANSACTION_TYPE,
  type EXPENSE_CATAGORIES,
  type INCOME_CATAGORIES,
  type Transaction,
} from '@/types'
import { v4 as uuidv4 } from 'uuid'

export const useTransactionStore = defineStore('transactionStore', () => {
  //states
  const transactionFormCategory = ref<EXPENSE_CATAGORIES | INCOME_CATAGORIES>()
  const transactionFormType = ref<TRANSACTION_TYPE>()
  const transactionFormAmount = ref<number>()
  const transactionFormDate = ref<string>()
  const transactionList = ref<Array<Transaction>>([])
  //computeds
  const expenseCategoryList = computed(() => {
    return [
      'HOUSING',
      'UTILITIES',
      'GROCERIES',
      'TRANSPORTATION',
      'INSURANCE',
      'HEALTHCARE',
      'DINING_OUT',
      'ENTERTAINMENT',
      'SHOPPING',
      'TRAVEL',
      'HOBBIES',
      'OTHER',
    ]
  })
  const incomeCategoryList = computed(() => {
    return ['SALARY', 'FREELANCE', 'INVESMENT', 'BONUS', 'GIFT', 'OTHER']
  })
  const transactionTypeList = computed(() => {
    return ['EXPENSE', 'INCOME']
  })
  const getTransactionList = computed(() => {
    return transactionList.value
  })
  const balance = computed(() => {
    return totalIncome.value - totalExpense.value
  })
  const totalIncome = computed(() => {
    return transactionList.value.reduce((prevVal, currentValue) => {
      if (currentValue.type === TRANSACTION_TYPE.INCOME) {
        return prevVal + currentValue.amount
      }
      return prevVal
    }, 0)
  })
  const totalExpense = computed(() => {
    return transactionList.value.reduce((prevVal, currentValue) => {
      if (currentValue.type === TRANSACTION_TYPE.EXPENSE) {
        return prevVal + currentValue.amount
      }
      return prevVal
    }, 0)
  })

  //methods
  function createTransaction() {
    const transactionObject: Transaction = {
      id: uuidv4(),
      date: transactionFormDate.value!,
      amount: transactionFormAmount.value!,
      type: transactionFormType.value!,
      category: transactionFormCategory.value!,
    }
    transactionList.value.push(transactionObject)
    setLocalStorage()
    $resetTransactionForm()
  }
  function deleteTransaction(id: string) {
    transactionList.value = [
      ...transactionList.value.filter((item) => {
        return item.id !== id
      }),
    ]
    setLocalStorage()
  }
  function setLocalStorage() {
    const stringifiedTransactionList = JSON.stringify(transactionList.value)
    localStorage.setItem('transactionList', stringifiedTransactionList)
  }
  function getFromLocalStorage() {
    const stringifiedTransactionList = localStorage.getItem('transactionList')
    if (stringifiedTransactionList) {
      const transactionListArray = JSON.parse(stringifiedTransactionList) as Array<Transaction>
      transactionList.value = transactionListArray
    }
  }
  function $resetTransactionForm() {
    transactionFormCategory.value = undefined
    transactionFormType.value = undefined
    transactionFormAmount.value = undefined
    transactionFormDate.value = undefined
  }
  onMounted(() => {
    getFromLocalStorage()
  })

  return {
    //states
    transactionFormCategory,
    transactionFormType,
    transactionFormAmount,
    transactionFormDate,
    //computeds
    expenseCategoryList,
    incomeCategoryList,
    transactionTypeList,
    getTransactionList,
    totalIncome,
    totalExpense,
    balance,
    //methods
    createTransaction,
    deleteTransaction,
  }
})
