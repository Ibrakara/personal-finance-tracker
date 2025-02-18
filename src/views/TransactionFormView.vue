<template>
  <div
    class="flex flex-col min-h-[40vh] sm:w-sm md:w-md xl:w-xl justify-between gap-32 items-center"
  >
    <div class="w-full">
      <h5 class="text-center text-3xl font-semibold text-slate-500">Create Transaction</h5>
    </div>
    <form class="min-w-xs w-full mx-auto h-auto gap-3 flex flex-col justify-between items-center">
      <CustomDropdown
        v-model="transactionFormType"
        class="min-w-80 max-sm:w-3xs w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
        name="Category"
        :list="transactionTypeList"
      />
      <CustomDropdown
        v-model="transactionFormCategory"
        class="min-w-80 max-sm:w-3xs w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
        name="Type"
        :list="transactionCategoryList"
      />
      <CustomInput
        v-model="transactionFormDate"
        class="min-w-80 max-sm:w-3xs w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
        type="date"
        label="Date"
      />
      <CustomInput
        v-model="transactionFormAmount"
        class="min-w-80 max-sm:w-3xs w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
        type="number"
        label="Amount"
      />
      <CustomButton :disabled="isCreateButtonDisabled" @on-click="create">
        Create transaction
      </CustomButton>
    </form>
  </div>
</template>
<script setup lang="ts">
import CustomButton from '@/components/CustomButton.vue'
import CustomDropdown from '@/components/CustomDropdown.vue'
import CustomInput from '@/components/CustomInput.vue'
import { useNotificationStore } from '@/stores/notifiationStore'
import { useTransactionStore } from '@/stores/transactionStore'
import { storeToRefs } from 'pinia'
import { computed, watch } from 'vue'
const transactionStore = useTransactionStore()
const notificationStore = useNotificationStore()
const {
  transactionFormCategory,
  transactionFormType,
  transactionFormAmount,
  transactionFormDate,
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
const isCreateButtonDisabled = computed(() => {
  return (
    !transactionFormCategory.value ||
    !transactionFormType.value ||
    !transactionFormAmount.value ||
    !transactionFormDate.value
  )
})
watch(
  () => transactionFormType.value,
  () => {
    transactionFormCategory.value = undefined
  },
)
function create() {
  createTransaction()
  notificationStore.addNotification('Transaction is successfully created.', 'success')
}
</script>
