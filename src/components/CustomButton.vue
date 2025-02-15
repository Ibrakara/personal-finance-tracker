<template>
  <button
    type="button"
    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    @click="onClick"
  >
    {{ name }}
  </button>
</template>
<script setup lang="ts">
interface CustomButtonProps {
  name: string
}
withDefaults(defineProps<CustomButtonProps>(), {
  name: '',
})
const emit = defineEmits<{
  (e: 'onClick', value: unknown): void
}>()
const onClick = (event: Event) => {
  event.preventDefault()
  console.log(event)
  emit('onClick', event.target)
}
</script>
