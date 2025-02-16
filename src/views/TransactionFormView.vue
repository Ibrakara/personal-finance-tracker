<template>
  <div class="flex flex-col min-h-96 sm:w-sm md:w-md xl:w-xl justify-between items-center">
    <div class="w-full">
      <h5 class="text-center text-3xl font-semibold text-slate-500">Create Transaction</h5>
    </div>
    <form class="min-w-xs w-full mx-auto min-h-72 flex flex-col justify-between items-center">
      <CustomDropdown
        v-model="transactionFormType"
        class="min-w-80 max-sm:w-3xs w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
        name="Category"
        :list="transactionTypeList"
      ></CustomDropdown>
      <CustomDropdown
        v-model="transactionFormCategory"
        class="min-w-80 max-sm:w-3xs w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
        name="Type"
        :list="transactionCategoryList"
      ></CustomDropdown>
      <CustomInput
        v-model="transactionFormAmount"
        class="min-w-80 max-sm:w-3xs w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
        type="number"
        label="Amount"
      ></CustomInput>
      <CustomButton
        :disabled="!transactionFormCategory || !transactionFormType || !transactionFormAmount"
        name="Create transaction"
        @on-click="createTransaction"
      ></CustomButton>
    </form>
  </div>
</template>
<script setup lang="ts">
import CustomButton from '@/components/CustomButton.vue'
import CustomDropdown from '@/components/CustomDropdown.vue'
import CustomInput from '@/components/CustomInput.vue'
import { useTransactionStore } from '@/stores/transactionStore'
import { storeToRefs } from 'pinia'
import { computed, watch } from 'vue'
const transactionStore = useTransactionStore()
const {
  transactionFormCategory,
  transactionFormType,
  transactionFormAmount,
  expenseCategoryList,
  incomeCategoryList,
  transactionTypeList,
} = storeToRefs(transactionStore)
const { createTransaction } = transactionStore
const transactionCategoryList = computed(() => {
  return transactionFormType.value !== 'INCOME'
    ? expenseCategoryList.value
    : incomeCategoryList.value
})
watch(
  () => transactionFormType.value,
  () => {
    transactionFormCategory.value = undefined
  },
)
</script>
