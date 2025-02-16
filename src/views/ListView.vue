<template>
  <CustomTable :transactionList="getTransactionList"></CustomTable>
</template>
<script setup lang="ts">
import CustomTable from '@/components/CustomTable.vue'
import { useTransactionStore } from '@/stores/transactionStore'
import { storeToRefs } from 'pinia'
const transactionStore = useTransactionStore()
const { getTransactionList } = storeToRefs(transactionStore)
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
