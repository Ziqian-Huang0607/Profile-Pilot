<template>
  <div class="flex items-center gap-4 justify-end">
    <!-- Dark Mode Toggle -->
    <button
      @click="toggleDarkMode"
      class="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
      :aria-label="$t('toggle_dark')"
    >
      <SunIcon v-if="isDark" class="w-5 h-5 text-yellow-400" />
      <MoonIcon v-else class="w-5 h-5 text-gray-800" />
    </button>

    <!-- Language Selector -->
    <select
      v-model="locale"
      @change="changeLocale"
      class="p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white"
      :aria-label="$t('language_label')"
    >
      <option value="en">EN</option>
      <option value="es">ES</option>
    </select>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { MoonIcon, SunIcon } from 'lucide-vue-next';

export default {
  components: { MoonIcon, SunIcon },
  setup() {
    const { locale } = useI18n();
    const isDark = ref(false);

    const toggleDarkMode = () => {
      isDark.value = !isDark.value;
      document.documentElement.classList.toggle('dark', isDark.value);
      localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
    };

    const changeLocale = () => {
      localStorage.setItem('lang', locale.value);
    };

    onMounted(() => {
      const storedTheme = localStorage.getItem('theme');
      isDark.value = storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
      document.documentElement.classList.toggle('dark', isDark.value);

      const storedLang = localStorage.getItem('lang');
      if (storedLang) locale.value = storedLang;
    });

    return {
      isDark,
      locale,
      toggleDarkMode,
      changeLocale
    };
  }
};
</script>

<style scoped>
select {
  min-width: 64px;
}
</style>
