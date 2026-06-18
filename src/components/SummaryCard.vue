<script setup>
import { FileText } from 'lucide-vue-next';

const props = defineProps({
  summary: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <section
    class="
      backdrop-blur-xl bg-white/75
      border border-white/25 rounded-[20px]
      shadow-[0_12px_48px_rgba(0,0,0,0.10)]
      dark:bg-black/55 dark:border-white/8 dark:shadow-[0_12px_48px_rgba(0,0,0,0.35)]
      p-6 sm:p-8
      mb-5
      animate-fade-up
      overflow-hidden
    "
  >
    <!-- Section label -->
    <div class="flex items-center gap-2.5 mb-5">
      <div
        class="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-900/20 flex items-center justify-center"
      >
        <FileText
          class="w-4 h-4 text-teal-600 dark:text-teal-400"
          stroke-width="2"
        />
      </div>
      <h3
        class="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
      >
        Overall Summary
      </h3>
    </div>

    <!-- Summary text rendered as HTML -->
    <div
      class="
        summary-content
        text-base sm:text-lg
        text-slate-700 dark:text-slate-200
        leading-[1.75]
        prose dark:prose-invert max-w-none
      "
    >
      <div v-if="summary" v-html="summary" />
      <div v-else class="text-slate-400 dark:text-slate-500 italic">
        No summary available for this profile.
      </div>
    </div>
  </section>
</template>

<style scoped>
.summary-content :deep(p) {
  margin-bottom: 1rem;
  line-height: 1.75;
}
.summary-content :deep(p:last-child) {
  margin-bottom: 0;
}
.summary-content :deep(strong) {
  font-weight: 600;
  color: inherit;
}
.summary-content :deep(a) {
  color: #0d9488;
  text-decoration: none;
}
.summary-content :deep(a:hover) {
  text-decoration: underline;
}
.summary-content :deep(ul),
.summary-content :deep(ol) {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}
.summary-content :deep(li) {
  margin-bottom: 0.25rem;
}
.summary-content :deep(h1),
.summary-content :deep(h2),
.summary-content :deep(h3) {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
}
.summary-content :deep(code) {
  background-color: rgba(13, 148, 136, 0.1);
  padding: 0.125rem 0.375rem;
  border-radius: 0.375rem;
  font-size: 0.875em;
}
.summary-content :deep(pre) {
  background-color: rgba(0, 0, 0, 0.05);
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin-bottom: 1rem;
}
.dark .summary-content :deep(pre) {
  background-color: rgba(255, 255, 255, 0.05);
}
</style>
