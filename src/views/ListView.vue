<template>
  <CustomTable :transactionList="transactionList"></CustomTable>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import CustomTable from '@/components/CustomTable.vue'
import { EXPENSE_CATAGORIES, TRANSACTION_TYPE } from '@/types'
const transactionList = computed(() => {
  const today = new Date()
  return [
    {
      amout: 0,
      category: EXPENSE_CATAGORIES.TRANSPORTATION,
      date: today,
      type: TRANSACTION_TYPE.EXPENSE,
    },
  ]
})
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
