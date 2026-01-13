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

const editorRef = ref<{ textarea: HTMLTextAreaElement } | null>(null)
const previewRef = ref<{ preview: HTMLDivElement } | null>(null)

// Flag to prevent infinite scroll loops
const isScrolling = ref(false)

// Tab management for mobile
const activeTab = ref<'editor' | 'preview'>('editor')

const handleEditorScroll = () => {
  if (isScrolling.value) return

  const editor = editorRef.value?.textarea
  const preview = previewRef.value?.preview

  if (editor && preview) {
    isScrolling.value = true
    const percentage = editor.scrollTop / (editor.scrollHeight - editor.clientHeight)
    if (!isNaN(percentage)) {
      preview.scrollTop = percentage * (preview.scrollHeight - preview.clientHeight)
    }
    setTimeout(() => (isScrolling.value = false), 100)
  }
}

const handlePreviewScroll = () => {
  if (isScrolling.value) return

  const editor = editorRef.value?.textarea
  const preview = previewRef.value?.preview

  if (editor && preview) {
    isScrolling.value = true
    const percentage = preview.scrollTop / (preview.scrollHeight - preview.clientHeight)
    if (!isNaN(percentage)) {
      editor.scrollTop = percentage * (editor.scrollHeight - editor.clientHeight)
    }
    setTimeout(() => (isScrolling.value = false), 100)
  }
}

const copyToClipboard = async () => {
  if (!renderedHtml.value) return

  try {
    await navigator.clipboard.writeText(renderedHtml.value)
    alert('¡HTML copiado al portapapeles!')
  } catch (err) {
    console.error('Error al copiar:', err)
    alert('Error al copiar el contenido.')
  }
}
</script>

<template>
  <div
    class="h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col font-sans overflow-hidden"
  >
    <!-- Main Content -->
    <main class="flex-1 flex flex-col md:flex-row overflow-hidden relative">
      <!-- Mobile Tabs -->
      <div
        class="md:hidden flex border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900"
      >
        <button
          @click="activeTab = 'editor'"
          :class="[
            'flex-1 py-3 text-sm font-medium transition-colors border-b-2',
            activeTab === 'editor'
              ? 'text-blue-600 border-blue-600'
              : 'text-gray-500 border-transparent',
          ]"
        >
          Editor
        </button>
        <button
          @click="activeTab = 'preview'"
          :class="[
            'flex-1 py-3 text-sm font-medium transition-colors border-b-2',
            activeTab === 'preview'
              ? 'text-blue-600 border-blue-600'
              : 'text-gray-500 border-transparent',
          ]"
        >
          Vista Previa
        </button>
      </div>

      <!-- Editor Section -->
      <div
        :class="[
          'flex-1 h-full overflow-hidden transition-all duration-300',
          activeTab === 'editor' ? 'block' : 'hidden md:block',
          'md:border-r border-gray-200 dark:border-gray-800',
        ]"
      >
        <MarkdownEditor
          ref="editorRef"
          v-model="markdown"
          @scroll="handleEditorScroll"
          class="h-full !border-none !rounded-none"
        />
      </div>

      <!-- Preview Section -->
      <div
        :class="[
          'flex-1 h-full overflow-hidden transition-all duration-300',
          activeTab === 'preview' ? 'block' : 'hidden md:block',
        ]"
      >
        <HtmlPreview
          ref="previewRef"
          :html="renderedHtml"
          @copy="copyToClipboard"
          @scroll="handlePreviewScroll"
          class="h-full !border-none !rounded-none"
        />
      </div>
    </main>
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
