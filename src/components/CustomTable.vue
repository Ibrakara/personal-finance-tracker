<template>
  <table class="w-full text-sm text-center rtl:text-right text-gray-300 dark:text-gray-200">
    <thead class="text-xs text-gray-500 capitalize bg-gray-50 dark:bg-gray-500 dark:text-gray-200">
      <tr>
        <th class="md:px-2 py-2">Type</th>
        <th class="md:px-2 py-2">Category</th>
        <th class="md:px-2 py-2">Date</th>
        <th class="md:px-2 py-2">Amount</th>
        <th class="md:px-2 py-2">Actions</th>
      </tr>
    </thead>
    <tbody v-if="transactionList.length > 0">
      <tr
        class="bg-white border-b dark:bg-gray-600 dark:border-gray-500 border-gray-100"
        v-for="(item, index) in transactionList"
        :key="index"
      >
        <td class="md:px-2 py-2">{{ item.type }}</td>
        <td class="md:px-2 py-2">{{ item.category }}</td>
        <td class="md:px-2 py-2">{{ item.date }}</td>
        <td class="md:px-2 py-2">{{ item.amout }} TL</td>
        <td class="md:px-2 py-2 flex justify-center">
          <img
            class="w-4 cursor-pointer"
            src="../assets/delete.svg"
            alt="delete-button"
            @click="onDelete($event, item.id)"
          />
        </td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr class="bg-white border-b dark:bg-gray-600 dark:border-gray-500 border-gray-100">
        <td class="px-6 py-4">-</td>
        <td class="px-6 py-4">-</td>
        <td class="px-6 py-4">-</td>
        <td class="px-6 py-4">- TL</td>
        <td class="px-6 py-4 flex justify-center">-</td>
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
