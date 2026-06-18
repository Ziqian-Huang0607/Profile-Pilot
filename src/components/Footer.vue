<template>
  <footer class="relative z-0 backdrop-blur-xl bg-white/70 border-t border-white/25 dark:bg-black/55 dark:border-white/8 transition-all duration-300 ease-smooth">
    <div class="max-w-[1200px] mx-auto px-6 md:px-12 py-8 sm:py-10">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div class="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-logo">
              <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="3" fill="currentColor"/>
                <line x1="12" y1="2" x2="12" y2="6"/>
                <line x1="12" y1="18" x2="12" y2="22"/>
                <line x1="2" y1="12" x2="6" y2="12"/>
                <line x1="18" y1="12" x2="22" y2="12"/>
              </svg>
            </div>
            <span class="text-base font-semibold text-slate-800 dark:text-slate-100">Profile Pilot</span>
          </div>
          <span class="hidden sm:block text-slate-300 dark:text-slate-700">|</span>
          <p class="text-sm text-slate-500 dark:text-slate-400 text-center sm:text-left">AI-powered GitHub profile analysis</p>
        </div>
        <div class="flex items-center gap-4 sm:gap-6">
          <a href="https://github.com/Ziqian-Huang0607/Profile-Pilot" target="_blank" rel="noopener noreferrer"
            class="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors duration-200 ease-smooth inline-flex items-center gap-1.5">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            Repository
          </a>
          <a href="https://waic.app" target="_blank" rel="noopener noreferrer"
            class="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors duration-200 ease-smooth">WAIC</a>
        </div>
      </div>
      <div class="mt-6 pt-6 border-t border-black/5 dark:border-white/6 text-center">
        <p class="text-xs text-slate-400 dark:text-slate-500 leading-relaxed" v-html="t('footer.credit', { year: currentYear })"></p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const currentYear = new Date().getFullYear();
</script>
