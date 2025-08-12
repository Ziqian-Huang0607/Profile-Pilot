<template>
  <div class="flex gap-3 mb-4">
    <input
      v-model="username"
      @keyup.enter="emitAnalyze"
      class="flex-grow px-4 py-2 rounded-lg border dark:bg-gray-900 dark:text-white"
      :placeholder="$t('placeholder')"
    />
    <button
      class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold"
      @click="emitAnalyze"
    >
      {{ $t('analyze') }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const username = ref('');
const emit = defineEmits(['analyze']);

function emitAnalyze() {
  if (!username.value.trim()) {
    alert(useI18n().t('empty_input'));
    return;
  }
  emit('analyze', username.value.trim());
}
</script>
