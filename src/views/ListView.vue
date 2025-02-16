<template>
  <div class="flex flex-col w-[80vw] justify-around items-center h-[80vh]">
    <h5 class="text-center text-3xl font-semibold text-slate-500">Transaction List</h5>
    <div class="flex flex-col w-full justify-center items-center gap-8">
      <div class="flex flex-col min-h-40 sm:w-sm md:w-md xl:w-xl justify-between items-center">
        <h2 class="text-center text-xl font-semibold text-slate-500">Filter Transaction</h2>
        <form
          class="min-w-xs w-full mx-auto h-auto gap-3 flex flex-col justify-between items-center"
        >
          <CustomInput
            v-model="transactionFilterStartDate"
            class="min-w-80 max-sm:w-3xs w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
            type="date"
            label="Start Date"
            :max="transactionFilterEndDate"
          />
          <CustomInput
            v-model="transactionFilterEndDate"
            class="min-w-80 max-sm:w-3xs w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
            type="date"
            label="End Date"
            :min="transactionFilterStartDate"
          />
        </form>
      </div>
      <CustomTable
        :transactionList="transactionListByDate"
        @onDelete="(id) => deleteTransaction(id)"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import CustomInput from '@/components/CustomInput.vue'
import CustomTable from '@/components/CustomTable.vue'
import { useTransactionStore } from '@/stores/transactionStore'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
//store inits
const transactionStore = useTransactionStore()
const { getTransactionList } = storeToRefs(transactionStore)
const { deleteTransaction } = transactionStore
//states
const transactionFilterStartDate = ref('')
const transactionFilterEndDate = ref('')
//computeds
const transactionListByDate = computed(() => {
  return getTransactionList.value.filter((transaction) => {
    const transactionDate = new Date(transaction.date)
    const filterStartDate = transactionFilterStartDate.value
      ? new Date(transactionFilterStartDate.value)
      : null
    const filterEndDate = transactionFilterEndDate.value
      ? new Date(transactionFilterEndDate.value)
      : null

    if (!filterStartDate && !filterEndDate) {
      return true // Do not filter if both start and end dates are empty
    }

    if (filterStartDate && filterEndDate) {
      return transactionDate >= filterStartDate && transactionDate <= filterEndDate
    }

    if (filterStartDate) {
      return transactionDate >= filterStartDate
    }

    if (filterEndDate) {
      return transactionDate <= filterEndDate
    }

    return true
  })
})
</script>
