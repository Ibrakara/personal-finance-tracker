<template>
  <nav class="bg-white shadow-md fixed top-0 left-0 w-full z-50">
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="text-lg md:text-2xl font-bold text-blue-600">Personal Transaction Tracker</div>
        <div class="hidden md:flex gap-2">
          <RouterLink
            v-for="link in links"
            :key="link.path"
            :to="link.path"
            class="text-gray-700 hover:text-blue-500 hover:font-semibold transition-all w-36 text-center"
            >{{ link.name }}</RouterLink
          >
        </div>
        <button @click="isOpen = !isOpen" class="md:hidden p-2 text-gray-700">
          <svg
            v-if="!isOpen"
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
          <svg
            v-else
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
    </div>
    <div
      v-if="isOpen"
      class="absolute top-16 left-0 w-full bg-white shadow-md md:hidden transition-all duration-300"
    >
      <div class="px-4 py-3 space-y-2">
        <RouterLink
          v-for="link in links"
          :key="link.path"
          :to="link.path"
          class="block text-gray-700 hover:text-blue-500 hover:font-semibold transition-all"
          @click="isOpen = false"
          >{{ link.name }}</RouterLink
        >
      </div>
    </div>
  </nav>
</template>
<script setup lang="ts">
import { ref } from 'vue'

type NavLink = {
  name: string
  path: string
}

const links: NavLink[] = [
  { name: 'Analytics', path: '/' },
  { name: 'Create Transaction', path: '/create' },
  { name: 'Transaction List', path: '/list' },
]

const isOpen = ref(false)
</script>
