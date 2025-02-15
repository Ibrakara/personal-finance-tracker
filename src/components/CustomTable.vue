<template>
  <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 capitalize bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th class="px-6 py-3">Type</th>
        <th class="px-6 py-3">Category</th>
        <th class="px-6 py-3">Date</th>
        <th class="px-6 py-3">Amount</th>
        <th class="px-6 py-3">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr
        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
        v-for="(item, index) in transactionList"
        :key="index"
      >
        <td class="px-6 py-4">{{ item.type }}</td>
        <td class="px-6 py-4">{{ item.category }}</td>
        <td class="px-6 py-4">{{ item.date }}</td>
        <td class="px-6 py-4">{{ item.amout }}</td>
        <td class="px-6 py-4">Delete</td>
      </tr>
    </tbody>
  </table>
</template>
<script setup lang="ts">
import type { Expense, Income } from '@/types'
interface CustomTableProps {
  transactionList: Expense[] | Income[]
}
defineProps<CustomTableProps>()
</script>
