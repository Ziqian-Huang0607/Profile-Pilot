<template>
  <footer class="text-center text-base text-gray-600 dark:text-gray-400 py-8 border-t border-gray-300 dark:border-gray-700 mt-10">
    <p v-html="t('footer.credit', { year: currentYear })"></p>
  </footer>
</template>



<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const currentYear = new Date().getFullYear()
</script>
