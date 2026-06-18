<template>
  <div
    class="
      w-full max-w-xl mx-auto mt-4
      backdrop-blur-lg bg-red-50/80
      border border-red-200/50 rounded-2xl
      shadow-[0_4px_16px_rgba(220,38,38,0.06)]
      dark:bg-red-900/20 dark:border-red-700/20
      p-4 sm:p-5
      flex items-start gap-3
      animate-fade-up
    "
  >
    <!-- Error icon -->
    <div
      class="
        w-8 h-8 rounded-lg bg-red-100 dark:bg-red-800/30
        flex items-center justify-center flex-shrink-0 mt-0.5
      "
    >
      <svg
        class="w-4 h-4 text-red-600 dark:text-red-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    </div>

    <div class="flex-1 min-w-0">
      <h3 class="text-sm font-semibold text-red-800 dark:text-red-300 mb-1">
        {{ errorTitle }}
      </h3>
      <p class="text-sm text-red-600 dark:text-red-400">
        {{ errorMessage }}
      </p>
    </div>

    <!-- Dismiss button -->
    <button
      @click="$emit('dismiss')"
      class="
        flex-shrink-0 text-red-400 hover:text-red-600
        dark:text-red-500 dark:hover:text-red-300
        transition-colors
      "
      :aria-label="$t('errors.dismiss') || 'Dismiss error'"
    >
      <svg
        class="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
  errorType: {
    type: String,
    default: 'generic'
  }
});

defineEmits(['dismiss']);

const errorConfig = computed(() => {
  const types = {
    invalid_username: {
      title: t('errors.invalid_username.title'),
      message: t('errors.invalid_username.message')
    },
    private_profile: {
      title: t('errors.private_profile.title'),
      message: t('errors.private_profile.message')
    },
    rate_limit: {
      title: t('errors.rate_limit.title'),
      message: t('errors.rate_limit.message')
    },
    generation_failed: {
      title: t('errors.generation_failed.title'),
      message: t('errors.generation_failed.message')
    },
    network_error: {
      title: t('errors.network_error.title'),
      message: t('errors.network_error.message')
    },
    generic: {
      title: t('errors.generic.title'),
      message: t('errors.generic.message')
    }
  };
  return types[props.errorType] || types.generic;
});

const errorTitle = computed(() => errorConfig.value.title);
const errorMessage = computed(() => errorConfig.value.message);
</script>
