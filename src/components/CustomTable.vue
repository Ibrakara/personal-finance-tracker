<template>
  <table class="w-5/6 text-sm text-center rtl:text-right text-gray-300 dark:text-gray-200">
    <thead class="text-xs text-gray-500 capitalize bg-gray-50 dark:bg-gray-500 dark:text-gray-200">
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
        class="bg-white border-b dark:bg-gray-600 dark:border-gray-500 border-gray-100"
        v-for="(item, index) in transactionList"
        :key="index"
      >
        <td class="px-6 py-4">{{ item.type }}</td>
        <td class="px-6 py-4">{{ item.category }}</td>
        <td class="px-6 py-4">{{ item.date }}</td>
        <td class="px-6 py-4">{{ item.amout }}</td>
        <td class="px-6 py-4 flex justify-center">
          <img
            class="w-4 cursor-pointer"
            src="../assets/delete.svg"
            alt="delete-button"
            @click="onDelete($event, item.id)"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script setup lang="ts">
import type { Transaction } from '@/types'
interface CustomTableProps {
  transactionList: Transaction[]
}
defineProps<CustomTableProps>()
const emit = defineEmits<{
  (e: 'onDelete', value: string): void
}>()
const onDelete = (event: Event, id: string) => {
  event.preventDefault()
  emit('onDelete', id)
}
</script>
