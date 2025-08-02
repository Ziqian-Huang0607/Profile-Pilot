<template>
  <div class="flex justify-end gap-3 mb-4 border-b pb-4" v-if="visible">
    <button @click="copy" class="action-btn">{{ copied ? $t('copied') : $t('copy') }}</button>
    <button @click="download" class="action-btn">{{ $t('download') }}</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const props = defineProps({ visible: Boolean, content: String, filename: String });
const copied = ref(false);

const copy = async () => {
  try {
    await navigator.clipboard.writeText(props.content);
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
  } catch {
    alert('Could not copy.');
  }
};

const download = () => {
  const blob = new Blob([props.content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${props.filename || 'report'}.md`;
  a.click();
  URL.revokeObjectURL(url);
};
</script>

<style scoped>
.action-btn {
  background-color: #f6f8fa;
  color: #24292e;
  border: 1px solid rgba(27, 31, 35, 0.15);
  padding: 6px 12px;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 6px;
  transition: background-color 0.2s;
}
.action-btn:hover {
  background-color: #e1e4e8;
}
</style>
