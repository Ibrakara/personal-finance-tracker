<template>
  <div class="flex flex-col w-[80vw] justify-start gap-6 items-center h-[80vh]">
    <h1 class="text-center text-3xl font-semibold text-slate-500">Analytics</h1>
    <div
      class="flex flex-col w-full justify-around items-center bg-gray-50 border border-gray-100 rounded-l shadow-md overflow-hidden h-96"
    >
      <div class="flex justify-around w-full gap-2">
        <CardComponent title="Income" :description="`${totalIncome ? totalIncome : '-'} TL`" />
        <CardComponent title="Expense" :description="`${totalExpense ? totalExpense : '-'} TL`" />
        <CardComponent title="Balance" :description="`${balance ? balance : '-'} TL`" />
      </div>
      <div class="flex justify-around w-full">
        <CardComponent title="Total Income" description="1290 TL" />
        <CardComponent title="Total Expense" />
        <CardComponent title="Balance" description="0 TL" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import CardComponent from '@/components/CardComponent.vue'
import { useTransactionStore } from '@/stores/transactionStore'
import { storeToRefs } from 'pinia'
const transactionStore = useTransactionStore()
const { balance, totalExpense, totalIncome } = storeToRefs(transactionStore)
</script>
