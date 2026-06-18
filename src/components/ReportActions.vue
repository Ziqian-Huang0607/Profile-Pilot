<script setup>
import { ref } from 'vue';
import { Copy, Check, Download, Share2, Search } from 'lucide-vue-next';

const props = defineProps({
  markdown: {
    type: String,
    default: '',
  },
  username: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['analyzeAnother', 'shareReport']);

const copied = ref(false);
const shared = ref(false);

async function copyReport() {
  const text = props.markdown || '';
  try {
    await navigator.clipboard.writeText(text);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    // Fallback
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  }
}

function downloadReport() {
  const text = props.markdown || '';
  const blob = new Blob([text], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${props.username || 'profile'}-profile-report.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

async function shareReport() {
  const shareUrl = `${window.location.origin}?user=${props.username || ''}`;
  try {
    await navigator.clipboard.writeText(shareUrl);
    shared.value = true;
    setTimeout(() => {
      shared.value = false;
    }, 2000);
  } catch (err) {
    // Fallback
    const textarea = document.createElement('textarea');
    textarea.value = shareUrl;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    shared.value = true;
    setTimeout(() => {
      shared.value = false;
    }, 2000);
  }
  emit('shareReport');
}

function handleAnalyzeAnother() {
  emit('analyzeAnother');
}
</script>

<template>
  <section
    class="
      backdrop-blur-xl bg-white/75
      border border-white/25 rounded-[20px]
      shadow-[0_12px_48px_rgba(0,0,0,0.10)]
      dark:bg-black/55 dark:border-white/8 dark:shadow-[0_12px_48px_rgba(0,0,0,0.35)]
      p-5 sm:p-6
      mb-10
      animate-fade-up
      overflow-hidden
    "
  >
    <div
      class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4"
    >
      <!-- Export actions -->
      <div class="flex items-center gap-2 sm:gap-3 flex-wrap">
        <!-- Copy to Clipboard -->
        <button
          @click="copyReport"
          class="
            inline-flex items-center justify-center gap-2
            px-4 py-2.5 rounded-xl text-sm font-medium
            bg-white/40 border border-white/20
            text-slate-700 dark:text-slate-200
            dark:bg-white/5 dark:border-white/10
            hover:bg-white/60 hover:border-white/35
            dark:hover:bg-white/10 dark:hover:border-white/20
            transition-all duration-200 ease-smooth
            active:scale-[0.98]
            focus:outline-none focus:ring-2 focus:ring-teal-600/25
          "
          :class="{
            'text-emerald-600 dark:text-emerald-400 border-emerald-300/50 bg-emerald-50/50 dark:bg-emerald-900/20': copied,
          }"
        >
          <Check v-if="copied" class="w-4 h-4" stroke-width="2.5" />
          <Copy v-else class="w-4 h-4" stroke-width="2" />
          <span>{{ copied ? 'Copied!' : 'Copy' }}</span>
        </button>

        <!-- Download Markdown -->
        <button
          @click="downloadReport"
          class="
            inline-flex items-center justify-center gap-2
            px-4 py-2.5 rounded-xl text-sm font-medium
            bg-white/40 border border-white/20
            text-slate-700 dark:text-slate-200
            dark:bg-white/5 dark:border-white/10
            hover:bg-white/60 hover:border-white/35
            dark:hover:bg-white/10 dark:hover:border-white/20
            transition-all duration-200 ease-smooth
            active:scale-[0.98]
            focus:outline-none focus:ring-2 focus:ring-teal-600/25
          "
        >
          <Download class="w-4 h-4" stroke-width="2" />
          <span>Download</span>
        </button>

        <!-- Share -->
        <button
          @click="shareReport"
          class="
            inline-flex items-center justify-center gap-2
            px-4 py-2.5 rounded-xl text-sm font-medium
            bg-white/40 border border-white/20
            text-slate-700 dark:text-slate-200
            dark:bg-white/5 dark:border-white/10
            hover:bg-white/60 hover:border-white/35
            dark:hover:bg-white/10 dark:hover:border-white/20
            transition-all duration-200 ease-smooth
            active:scale-[0.98]
            focus:outline-none focus:ring-2 focus:ring-teal-600/25
          "
          :class="{
            'text-teal-600 dark:text-teal-400 border-teal-300/50 bg-teal-50/50 dark:bg-teal-900/20': shared,
          }"
        >
          <Share2 class="w-4 h-4" stroke-width="2" />
          <span>{{ shared ? 'Link copied!' : 'Share' }}</span>
        </button>
      </div>

      <!-- Analyze Another CTA -->
      <button
        @click="handleAnalyzeAnother"
        class="
          inline-flex items-center justify-center gap-2
          px-6 py-2.5 rounded-xl text-sm font-medium
          bg-teal-600 text-white
          transition-all duration-200 ease-spring
          hover:bg-teal-700 hover:shadow-[0_4px_20px_rgba(13,148,136,0.25)] hover:scale-[1.02]
          active:bg-teal-800 active:scale-[0.98]
          focus:outline-none focus:ring-2 focus:ring-teal-600/30
        "
      >
        <Search class="w-4 h-4" stroke-width="2" />
        <span>Analyze Another</span>
      </button>
    </div>
  </section>
</template>
