<template>
  <section class="relative pt-32 pb-16 sm:pt-40 sm:pb-24 px-6 md:px-12">
    <!-- Decorative floating blob behind hero -->
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] sm:w-[600px] sm:h-[600px] opacity-30 dark:opacity-10 pointer-events-none"
      style="background: radial-gradient(circle, rgba(13,148,136,0.15) 0%, transparent 60%); animation: float 20s ease-in-out infinite;"
    />

    <div class="relative max-w-2xl mx-auto text-center">
      <!-- Heading -->
      <h1
        class="
          text-[1.75rem] sm:text-[2.5rem] lg:text-[3rem]
          font-semibold
          leading-[1.15]
          tracking-[-0.02em]
          text-center
          mb-5
          animate-fade-up
        "
      >
        <span
          class="
            bg-gradient-to-r from-teal-700 via-teal-600 to-teal-700
            dark:from-teal-400 dark:via-teal-300 dark:to-teal-400
            bg-clip-text text-transparent
          "
        >
          {{ $t('hero.title.gradient') }}
        </span>
        <br>
        <span class="text-slate-700 dark:text-slate-200">
          {{ $t('hero.title.plain') }}
        </span>
      </h1>

      <!-- Subtitle -->
      <p
        class="
          text-base sm:text-lg
          text-slate-500 dark:text-slate-400
          text-center
          max-w-lg mx-auto
          mb-10
          leading-relaxed
          animate-fade-up
          animation-delay-80
        "
      >
        {{ $t('hero.subtitle') }}
      </p>

      <!-- Search Input (centerpiece) -->
      <div class="animate-fade-up-scale animation-delay-160">
        <SearchInput
          v-model="localUsername"
          :is-loading="isLoading"
          @analyze="handleAnalyze"
        />
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="mt-6 animate-fade-in">
        <StepIndicator :current-step="currentStep" />
      </div>

      <!-- Error State -->
      <div v-if="error && !isLoading" class="animate-fade-up">
        <ErrorAlert :error-type="errorType" @dismiss="handleClearError" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue';
import SearchInput from './SearchInput.vue';
import StepIndicator from './StepIndicator.vue';
import ErrorAlert from './ErrorAlert.vue';

const props = defineProps({
  username: {
    type: String,
    default: ''
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  currentStep: {
    type: Number,
    default: 0
  },
  error: {
    type: Boolean,
    default: false
  },
  errorType: {
    type: String,
    default: 'generic'
  }
});

const emit = defineEmits(['analyze', 'clearError']);

const localUsername = ref(props.username);

watch(() => props.username, (newVal) => {
  localUsername.value = newVal;
});

function handleAnalyze(username) {
  emit('analyze', username);
}

function handleClearError() {
  emit('clearError');
}
</script>
