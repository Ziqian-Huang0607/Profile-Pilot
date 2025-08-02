<template>
  <footer class="text-center text-sm text-gray-600 dark:text-gray-400 py-6 border-t border-gray-300 dark:border-gray-700 mt-10">
    <p>{{ $t('footer.credit') }}</p>
  </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>
