<template>
  <form class="flex flex-col justify-between min-h-16">
    <label :for="`dropdown-${name}`" class="block mb-3 text-sm text-slate-500">{{ name }}</label>
    <select
      v-model="selectModelValue"
      :id="`dropdown-${name}`"
      class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
    >
      <option hidden disabled selected value>Select {{ name }}</option>
      <option :value="item" v-for="item in list" :key="item">{{ item }}</option>
    </select>
  </form>
</template>
<script setup lang="ts">
interface CustomDropdownProps {
  list: string[]
  name: string
}
const selectModelValue = defineModel()
withDefaults(defineProps<CustomDropdownProps>(), {
  name: '',
})
</script>
