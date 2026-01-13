<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import MarkdownEditor from './components/MarkdownEditor.vue'
import HtmlPreview from './components/HtmlPreview.vue'
import { parseMarkdown } from './utils/markdown'

const markdown = ref(
  '# Hola Mundo\n\nEste es un editor de **Markdown** con vista previa en tiempo real.\n\n- Fácil de usar\n- Seguro (DOMPurify)\n- Copia el HTML generado',
)
const renderedHtml = ref('')

// Auto-save key
const STORAGE_KEY = 'markdown_content'

// Sync markdown to HTML
watch(
  markdown,
  async (newValue) => {
    renderedHtml.value = await parseMarkdown(newValue)
    localStorage.setItem(STORAGE_KEY, newValue)
  },
  { immediate: true },
)

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    markdown.value = saved
  }
})

const copyToClipboard = async () => {
  if (!renderedHtml.value) return

  try {
    await navigator.clipboard.writeText(renderedHtml.value)
    // Simple toast notification logic could go here
    alert('¡HTML copiado al portapapeles!')
  } catch (err) {
    console.error('Error al copiar:', err)
    alert('Error al copiar el contenido.')
  }
}
</script>

<template>
  <div
    class="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col font-sans selection:bg-blue-200 dark:selection:bg-blue-800"
  >
    <!-- Header -->
    <header
      class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-4 px-6 md:px-8 flex items-center justify-between sticky top-0 z-10 shadow-sm"
    >
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform cursor-default"
        >
          <i class="i-lucide-layout text-white text-xl"></i>
        </div>
        <h1
          class="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400"
        >
          Markdown View
        </h1>
      </div>

      <div class="flex items-center gap-4">
        <a
          href="https://github.com/webcloster/markdown-html-view"
          target="_blank"
          class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-600 dark:text-gray-400"
        >
          <i class="i-mdi-github text-xl"></i>
        </a>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 p-6 md:p-8 flex flex-col gap-6 max-w-7xl mx-auto w-full">
      <div
        class="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-12rem)] md:h-[calc(100vh-14rem)] min-h-[500px]"
      >
        <MarkdownEditor v-model="markdown" />
        <HtmlPreview :html="renderedHtml" @copy="copyToClipboard" />
      </div>
    </main>

    <!-- Footer -->
    <footer
      class="py-4 px-6 border-t border-gray-200 dark:border-gray-800 text-center text-xs text-gray-500 dark:text-gray-500"
    >
      Desarrollado con Vue 3 y UnoCSS • 2026
    </footer>
  </div>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  @apply bg-transparent;
}

::-webkit-scrollbar-thumb {
  @apply bg-gray-300 dark:bg-gray-700 rounded-full hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors;
}
</style>
