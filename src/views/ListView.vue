<template>
  <CustomTable :transactionList="getTransactionList" @onDelete="(id) => deleteTransaction(id)" />
</template>
<script setup lang="ts">
import CustomTable from '@/components/CustomTable.vue'
import { useTransactionStore } from '@/stores/transactionStore'
import { storeToRefs } from 'pinia'
const transactionStore = useTransactionStore()
const { getTransactionList } = storeToRefs(transactionStore)
const { deleteTransaction } = transactionStore
</script>
