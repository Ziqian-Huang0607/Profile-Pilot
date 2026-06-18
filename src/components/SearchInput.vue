<template>
  <div
    class="
      relative w-full max-w-xl mx-auto
      backdrop-blur-xl
      bg-white/80
      border border-white/30
      rounded-2xl
      shadow-[0_8px_32px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)]
      dark:bg-black/60 dark:border-white/12 dark:shadow-[0_8px_32px_rgba(0,0,0,0.35),0_2px_8px_rgba(0,0,0,0.15)]
      p-2
      flex items-center gap-2
      transition-all duration-300 ease-default
      focus-within:border-teal-500/40
      focus-within:shadow-[0_0_0_3px_rgba(13,148,136,0.12),0_8px_32px_rgba(0,0,0,0.08)]
      dark:focus-within:shadow-[0_0_0_3px_rgba(20,184,166,0.15),0_8px_32px_rgba(0,0,0,0.35)]
    "
  >
    <!-- GitHub icon inside input -->
    <div class="pl-3 flex-shrink-0">
      <svg
        class="w-5 h-5 text-slate-400 dark:text-slate-500"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    </div>

    <!-- Input field -->
    <input
      v-model="localUsername"
      type="text"
      :placeholder="$t('search.placeholder')"
      class="
        flex-1 bg-transparent border-none outline-none
        px-2 py-3
        text-base text-slate-800 dark:text-slate-100
        placeholder:text-slate-400 dark:placeholder:text-slate-500
        font-normal
      "
      :disabled="isLoading"
      @keydown.enter="handleAnalyze"
    />

    <!-- Analyze button -->
    <button
      @click="handleAnalyze"
      :disabled="!localUsername.trim() || isLoading"
      class="
        flex-shrink-0
        bg-teal-600 text-white
        rounded-xl
        px-6 py-3
        font-medium text-sm
        transition-all duration-200 ease-spring
        hover:bg-teal-700 hover:shadow-[0_4px_20px_rgba(13,148,136,0.30)] hover:scale-[1.02]
        active:bg-teal-800 active:scale-[0.98]
        disabled:opacity-30 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none
        focus:outline-none focus:ring-2 focus:ring-teal-600/30
      "
    >
      <span v-if="!isLoading">{{ $t('search.button') }}</span>
      <span v-else class="flex items-center gap-2">
        <svg
          class="w-4 h-4 animate-spin"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
        {{ $t('search.analyzing') }}
      </span>
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  isLoading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue', 'analyze']);

const localUsername = ref(props.modelValue);

watch(() => props.modelValue, (newVal) => {
  localUsername.value = newVal;
});

watch(localUsername, (newVal) => {
  emit('update:modelValue', newVal);
});

function handleAnalyze() {
  const trimmed = localUsername.value.trim();
  if (trimmed && !props.isLoading) {
    emit('analyze', trimmed);
  }
}
</script>
