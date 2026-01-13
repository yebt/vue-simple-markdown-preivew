<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div
    class="flex flex-col h-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900 transition-colors"
  >
    <div
      class="px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex items-center gap-2"
    >
      <i class="i-lucide-edit-3 text-emerald-500 w-4 h-4"></i>
      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Editor de Markdown</span>
    </div>
    <textarea
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      class="flex-1 w-full p-4 bg-transparent resize-none focus:outline-none text-gray-800 dark:text-gray-200 font-mono text-sm leading-relaxed"
      placeholder="Escribe tu markdown aquí..."
    ></textarea>
  </div>
</template>
