<template>
  <nav class="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-3xl sm:max-w-4xl backdrop-blur-xl bg-white/80 border border-white/25 rounded-2xl shadow-nav dark:bg-black/60 dark:border-white/10 dark:shadow-nav-dark px-4 py-3 sm:px-6 flex items-center justify-between transition-all duration-300 ease-smooth">
    <!-- Logo -->
    <div class="flex items-center gap-3">
      <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-logo">
        <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="3" fill="currentColor"/>
          <line x1="12" y1="2" x2="12" y2="6"/>
          <line x1="12" y1="18" x2="12" y2="22"/>
          <line x1="2" y1="12" x2="6" y2="12"/>
          <line x1="18" y1="12" x2="22" y2="12"/>
        </svg>
      </div>
      <span class="text-lg font-semibold text-slate-800 dark:text-slate-100 tracking-tight">Profile Pilot</span>
    </div>
    <!-- Right Actions -->
    <div class="flex items-center gap-1.5 sm:gap-2">
      <!-- GitHub desktop -->
      <a href="https://github.com/Ziqian-Huang0607/Profile-Pilot" target="_blank" rel="noopener noreferrer"
        class="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-white/60 hover:text-slate-800 dark:hover:bg-white/10 dark:hover:text-slate-100 transition-all duration-200 ease-smooth">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        <span>GitHub</span>
      </a>
      <!-- GitHub mobile -->
      <a href="https://github.com/Ziqian-Huang0607/Profile-Pilot" target="_blank" rel="noopener noreferrer"
        class="sm:hidden inline-flex items-center justify-center w-9 h-9 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-200"
        aria-label="GitHub repository">
        <svg class="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
      </a>
      <!-- Divider -->
      <div class="w-px h-5 bg-slate-200 dark:bg-white/10"></div>
      <!-- Language -->
      <select v-model="locale" @change="handleLocaleChange"
        class="bg-transparent text-sm font-medium text-slate-600 dark:text-slate-300 border-none outline-none cursor-pointer hover:text-slate-800 dark:hover:text-slate-100 transition-colors duration-200"
        :aria-label="t('language_label')">
        <option value="en">EN</option>
        <option value="es">ES</option>
      </select>
      <!-- Theme Toggle -->
      <button @click="toggleTheme"
        class="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white/30 border border-white/15 text-slate-600 dark:text-slate-300 dark:bg-white/5 dark:border-white/8 hover:bg-white/50 hover:border-white/30 dark:hover:bg-white/12 dark:hover:border-white/18 transition-all duration-200 ease-smooth focus:outline-none focus:ring-2 focus:ring-teal-600/25"
        :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
        <svg v-if="isDark" class="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
        </svg>
        <svg v-else class="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
        </svg>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale, t } = useI18n();
const isDark = ref(false);

function toggleTheme() {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle('dark', isDark.value);
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
}

function handleLocaleChange() {
  localStorage.setItem('lang', locale.value);
}

onMounted(() => {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  isDark.value = saved === 'dark' || (!saved && prefersDark);
  document.documentElement.classList.toggle('dark', isDark.value);
  const savedLang = localStorage.getItem('lang');
  if (savedLang) locale.value = savedLang;
});
</script>
