<script setup>
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'

const props = defineProps({
  reportMd: {
    type: String,
    required: true
  }
})

const md = new MarkdownIt()

function extractSections(mdText) {
  const lines = mdText.split('\n')
  const sections = []
  let currentTitle = ''
  let currentContent = []

  for (const line of lines) {
    if (line.startsWith('### ')) {
      if (currentTitle && currentContent.length) {
        sections.push({
          title: currentTitle,
          html: md.render(currentContent.join('\n'))
        })
      }
      currentTitle = line.replace(/^###\s*/, '').trim()
      currentContent = []
    } else {
      currentContent.push(line)
    }
  }

  // Agregar la última sección
  if (currentTitle && currentContent.length) {
    sections.push({
      title: currentTitle,
      html: md.render(currentContent.join('\n'))
    })
  }

  return sections
}

const sections = computed(() => extractSections(props.reportMd))
</script>

<template>
  <div class="space-y-8 max-w-4xl mx-auto p-4">
    <div
      v-for="section in sections"
      :key="section.title"
      class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
    >
      <h3 class="text-2xl font-bold mb-4">{{ section.title }}</h3>
      <div v-html="section.html" class="prose prose-indigo dark:prose-invert max-w-none"></div>
    </div>
  </div>
</template>
