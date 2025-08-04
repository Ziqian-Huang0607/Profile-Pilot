<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4">
    <DarkLangToggle class="mb-4" />
    <Header />
    <main class="max-w-3xl mx-auto">
      <InputForm @analyze="analyzeUsername" />
      <Loader :loading="loading" />
      <Actions :visible="showActions" :content="reportMarkdown" :filename="downloadFilename" />
      <div v-if="errorMessage" class="text-red-600 my-4">{{ errorMessage }}</div>
      <Report v-if="reportMarkdown" :reportMd="reportMarkdown" />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
import InputForm from './components/InputForm.vue';
import Loader from './components/Loader.vue';
import Actions from './components/Actions.vue';
import Report from './components/Report.vue';
import DarkLangToggle from './components/DarkLangToggle.vue';
import Footer from './components/Footer.vue';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const loading = ref(false);
const reportHtml = ref('');
const reportMarkdown = ref('');
const errorMessage = ref('');
const showActions = ref(false);
const downloadFilename = ref('');

// Reemplazá SOLO esta función con la versión que te pasé
const analyzeUsername = async (username) => {
  loading.value = true;
  reportHtml.value = '';
  reportMarkdown.value = '';
  errorMessage.value = '';
  showActions.value = false;
  downloadFilename.value = username;

  try {
    const lang = locale.value; // 👈 'en' o 'es'

    const response = await fetch(`https://profile-pilot-seven.vercel.app/api/index?username=${username}&lang=${lang}`);
    if (!response.ok) {
      let errorMsg = 'Server error';
      try {
        const errData = await response.json();
        errorMsg = errData.error || errorMsg;
      } catch {}
      throw new Error(errorMsg);
    }

    const data = await response.json();

    if (!data.report_md) {
      throw new Error('Response does not contain report data');
    }

    reportMarkdown.value = data.report_md;
    showActions.value = true;
  } catch (err) {
    errorMessage.value = err.message || 'Unknown error occurred';
  } finally {
    loading.value = false;
  }
};
</script>
