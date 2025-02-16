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
        <td class="md:px-2 py-2">{{ capitalizeFirstLetter(item.type) }}</td>
        <td class="md:px-2 py-2">{{ capitalizeFirstLetter(item.category) }}</td>
        <td class="md:px-2 py-2">{{ formatDate(item.date) }}</td>
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
  <div v-if="totalPages >= 1" class="flex justify-center space-x-2 mt-4">
    <button
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-3 py-1 border rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
    >
      « Prev
    </button>
    <button
      v-for="page in pages"
      :key="page"
      @click="goToPage(page)"
      class="px-3 py-1 border rounded-md"
      :class="currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'"
    >
      {{ page }}
    </button>
    <button
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-3 py-1 border rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
    >
      Next »
    </button>
  </div>
</template>
<script setup lang="ts">
import type { Transaction } from '@/types'
import { computed } from 'vue'
import { capitalizeFirstLetter, formatDate } from '@/helpers/index'

interface CustomTableProps {
  transactionList: Transaction[]
  currentPage: number
  totalPages: number
}
const props = defineProps<CustomTableProps>()
const emit = defineEmits<{
  (e: 'onDelete', value: string): void
  (event: 'update:currentPage', value: number): void
}>()
const onDelete = (event: Event, id: string) => {
  event.preventDefault()
  emit('onDelete', id)
}

const pages = computed(() => {
  let start = Math.max(1, props.currentPage - 2)
  const end = Math.min(props.totalPages, start + 4)

  if (end - start < 4) start = Math.max(1, end - 4)

  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('update:currentPage', page)
  }
}
</script>
