<template>
  <div class="flex flex-col w-[80vw] justify-start gap-6 items-center h-[80vh]">
    <h1 class="text-center text-3xl font-semibold text-slate-500">Analytics</h1>
    <div class="flex flex-col w-full justify-around items-center gap-3 overflow-hidden min-h-96">
      <div class="flex justify-around w-full gap-2">
        <CardComponent title="Income" :description="`${totalIncome ? totalIncome : '-'} TL`" />
        <CardComponent title="Expense" :description="`${totalExpense ? totalExpense : '-'} TL`" />
        <CardComponent title="Balance" :description="`${balance ? balance : '-'} TL`" />
      </div>
      <div class="flex justify-around w-full gap-2">
        <CardComponent title="Income by Category">
          <div class="h-48 w-full">
            <Doughnut :data="categoryChartDataByType(TRANSACTION_TYPE.INCOME)" :options="options" />
          </div>
        </CardComponent>
        <CardComponent title="Expense by Category">
          <div class="h-48 w-full">
            <Doughnut
              :data="categoryChartDataByType(TRANSACTION_TYPE.EXPENSE)"
              :options="options"
            />
          </div>
        </CardComponent>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import CardComponent from '@/components/CardComponent.vue'
import { useTransactionStore } from '@/stores/transactionStore'
import { storeToRefs } from 'pinia'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import { TRANSACTION_TYPE } from '@/types'
ChartJS.register(ArcElement, Tooltip, Legend)
const options = {
  responsive: true,
  maintainAspectRatio: false,
}

const transactionStore = useTransactionStore()
const { balance, totalExpense, totalIncome, categoryChartDataByType } =
  storeToRefs(transactionStore)
</script>
