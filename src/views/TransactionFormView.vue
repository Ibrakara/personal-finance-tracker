<template>
  <div class="flex flex-col min-h-96 sm:w-sm md:w-md xl:w-xl justify-between items-center">
    <div class="w-full">
      <h5 class="text-center text-3xl font-semibold text-slate-500">Create Transaction</h5>
    </div>
    <form class="min-w-xs w-full mx-auto min-h-72 flex flex-col justify-between items-center">
      <CustomDropdown
        v-model="categorySelection"
        class="min-w-80 max-sm:w-3xs w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
        name="Category"
        :list="['Expense', 'Income']"
      ></CustomDropdown>
      <CustomDropdown
        v-model="typeSelection"
        class="min-w-80 max-sm:w-3xs w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
        name="Type"
        :list="transactionTypeList"
      ></CustomDropdown>
      <CustomInput
        v-model="amount"
        class="min-w-80 max-sm:w-3xs w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
        type="number"
        label="Amount"
      ></CustomInput>
      <CustomButton name="Create transaction"></CustomButton>
    </form>
  </div>
</template>
<script setup lang="ts">
import CustomButton from '@/components/CustomButton.vue'
import CustomDropdown from '@/components/CustomDropdown.vue'
import CustomInput from '@/components/CustomInput.vue'
import { useTransactionStore } from '@/stores/transactionStore'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
const transactionStore = useTransactionStore()
const categorySelection = ref('')
const typeSelection = ref('')
const amount = ref(0)
const { expenseCategoryList } = storeToRefs(transactionStore)
const transactionTypeList = computed(() => {
  return expenseCategoryList.value
})
</script>
