<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  html: string
}>()

const emit = defineEmits<{
  (e: 'copy'): void
  (e: 'scroll', event: Event): void
}>()

const previewRef = ref<HTMLDivElement | null>(null)

const displayHtml = computed(
  () => props.html || '<p class="text-gray-400 italic">La vista previa aparecerá aquí...</p>',
)

defineExpose({
  preview: previewRef,
})
</script>

<template>
  <div
    class="flex flex-col h-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900 transition-colors"
  >
    <div
      class="px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex items-center justify-between"
    >
      <div class="flex items-center gap-2">
        <i class="i-lucide-eye text-blue-500 w-4 h-4"></i>
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Vista Previa</span>
      </div>
      <button
        @click="emit('copy')"
        class="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="!html"
      >
        <i class="i-lucide-copy w-3.5 h-3.5"></i>
        Copiar HTML
      </button>
    </div>
    <div
      ref="previewRef"
      @scroll="$emit('scroll', $event)"
      class="flex-1 w-full p-4 overflow-y-auto prose dark:prose-invert max-w-none prose-sm sm:prose"
      v-html="displayHtml"
    ></div>
  </div>
</template>

<style scoped>
/* Basic markdown styling for the preview */
:deep(h1) {
  @apply text-2xl font-bold mb-4 border-b pb-2 border-gray-200 dark:border-gray-700;
}
:deep(h2) {
  @apply text-xl font-semibold mb-3 mt-6;
}
:deep(h3) {
  @apply text-lg font-medium mb-2 mt-4;
}
:deep(p) {
  @apply mb-4 leading-relaxed;
}
:deep(ul) {
  @apply list-disc pl-5 mb-4;
}
:deep(ol) {
  @apply list-decimal pl-5 mb-4;
}
:deep(li) {
  @apply mb-1;
}
:deep(code) {
  @apply bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded font-mono text-sm text-pink-600 dark:text-pink-400;
}
:deep(pre) {
  @apply bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4 overflow-x-auto;
}
:deep(pre code) {
  @apply p-0 bg-transparent text-gray-800 dark:text-gray-200;
}
:deep(blockquote) {
  @apply border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-4;
}
:deep(a) {
  @apply text-blue-600 dark:text-blue-400 hover:underline;
}
:deep(img) {
  @apply max-w-full rounded-lg my-4;
}
:deep(table) {
  @apply w-full border-collapse mb-4;
}
:deep(th),
:deep(td) {
  @apply border border-gray-200 dark:border-gray-700 p-2 text-left;
}
:deep(th) {
  @apply bg-gray-50 dark:bg-gray-800;
}
</style>
