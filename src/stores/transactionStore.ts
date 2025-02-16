import { computed, onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import {
  type Expense,
  type EXPENSE_CATAGORIES,
  type Income,
  type INCOME_CATAGORIES,
  type TRANSACTION_TYPE,
} from '@/types'

export const useTransactionStore = defineStore('transactionStore', () => {
  //states
  const transactionFormCategory = ref<EXPENSE_CATAGORIES | INCOME_CATAGORIES>()
  const transactionFormType = ref<TRANSACTION_TYPE>()
  const transactionFormAmount = ref<number>()
  const transactionFormDate = ref<string>()
  const transactionList = ref<Array<Expense | Income>>([])
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

  //methods
  function createTransaction() {
    const transactionObject: Expense | Income = {
      date: transactionFormDate.value!,
      amout: transactionFormAmount.value!,
      type: transactionFormType.value!,
      category: transactionFormCategory.value!,
    }
    transactionList.value.push(transactionObject)
    setLocalStorage()
    $resetTransactionForm()
    console.log(transactionList.value)
  }
  function setLocalStorage() {
    const stringifiedTransactionList = JSON.stringify(transactionList.value)
    localStorage.setItem('transactionList', stringifiedTransactionList)
  }
  function getFromLocalStorage() {
    const stringifiedTransactionList = localStorage.getItem('transactionList')
    if (stringifiedTransactionList) {
      const transactionListArray = JSON.parse(stringifiedTransactionList) as Array<Expense | Income>
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
    //methods
    createTransaction,
  }
})
