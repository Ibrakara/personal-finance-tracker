<template>
  <div class="flex flex-col justify-between min-h-16">
    <label :for="label" class="block mb-3 text-sm text-slate-500">{{ label }}</label>
    <input
      v-model="inputModelValue"
      :type="type"
      class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
      :placeholder="placeholder"
      :name="label"
      :id="label"
      :min="min"
      :max="max"
    />
    <span v-if="error" class="form-error">{{ error }}</span>
  </div>
</template>
<script setup lang="ts">
import type { InputTypeHTMLAttribute } from 'vue'

interface CustomInputProps {
  label: string
  type: InputTypeHTMLAttribute
  placeholder?: string
  error?: string
  min?: string
  max?: string
}
const inputModelValue = defineModel()

withDefaults(defineProps<CustomInputProps>(), {
  placeholder: 'Fill input',
})
</script>
