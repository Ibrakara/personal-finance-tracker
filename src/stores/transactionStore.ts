import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { EXPENSE_CATAGORIES, INCOME_CATAGORIES, TRANSACTION_TYPE } from '@/types'

export const useTransactionStore = defineStore('transactionStore', () => {
  //states
  const transactionFormCategory = ref<EXPENSE_CATAGORIES | INCOME_CATAGORIES>()
  const transactionFormType = ref<TRANSACTION_TYPE>()
  const transactionFormAmount = ref<number>()
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
  function createTransaction() {
    console.log('clicked')
  }

  return {
    //states
    transactionFormCategory,
    transactionFormType,
    transactionFormAmount,
    //computeds
    expenseCategoryList,
    incomeCategoryList,
    transactionTypeList,
    //methods
    createTransaction,
  }
})
