<template>
  <div
    class="
      w-full max-w-xl mx-auto
      backdrop-blur-xl bg-white/80
      border border-white/30 rounded-2xl
      shadow-[0_8px_32px_rgba(0,0,0,0.08)]
      dark:bg-black/60 dark:border-white/12 dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)]
      p-6 sm:p-8
      text-center
      animate-fade-up
    "
  >
    <!-- Step indicator -->
    <div class="flex items-center justify-center gap-2 sm:gap-3 mb-6 flex-wrap">
      <template v-for="(step, i) in steps" :key="i">
        <div class="flex items-center gap-2">
          <div class="relative">
            <div
              class="
                w-8 h-8 rounded-full flex items-center justify-center
                transition-all duration-400 ease-smooth
              "
              :class="{
                'bg-teal-600 text-white': step.completed,
                'bg-teal-600 text-white animate-pulse': step.active,
                'bg-slate-200 text-slate-400 dark:bg-white/10 dark:text-slate-500': step.pending
              }"
            >
              <!-- Checkmark for completed -->
              <svg
                v-if="step.completed"
                class="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="3"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
              <!-- Number for pending/active -->
              <span v-else class="text-xs font-semibold">{{ i + 1 }}</span>
            </div>
          </div>
          <span
            class="text-sm transition-colors duration-300"
            :class="{
              'text-slate-800 dark:text-slate-100 font-medium': step.active || step.completed,
              'text-slate-400 dark:text-slate-500': step.pending
            }"
          >
            {{ step.label }}
          </span>
        </div>

        <!-- Connector -->
        <div
          v-if="i < steps.length - 1"
          class="w-6 sm:w-8 h-px transition-colors duration-400"
          :class="{
            'bg-teal-500/40': step.completed,
            'bg-slate-200 dark:bg-white/10': !step.completed
          }"
        />
      </template>
    </div>

    <!-- Current step description -->
    <p class="text-sm text-slate-500 dark:text-slate-400 animate-fade-in">
      {{ currentStepDescription }}
    </p>

    <!-- Progress bar -->
    <div class="mt-4 w-full h-1 rounded-full bg-slate-200/60 dark:bg-white/10 overflow-hidden">
      <div
        class="h-full bg-teal-600 rounded-full transition-all duration-500 ease-smooth"
        :style="{ width: progressPercent + '%' }"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
  currentStep: {
    type: Number,
    default: 0
  }
});

const stepLabels = computed(() => [
  t('steps[0].label'),
  t('steps[1].label'),
  t('steps[2].label'),
  t('steps[3].label')
]);

const stepDescriptions = computed(() => [
  t('steps[0].description'),
  t('steps[1].description'),
  t('steps[2].description'),
  t('steps[3].description')
]);

const steps = computed(() =>
  stepLabels.value.map((label, i) => ({
    label,
    pending: i > props.currentStep,
    active: i === props.currentStep,
    completed: i < props.currentStep
  }))
);

const currentStepDescription = computed(() => {
  if (props.currentStep >= 0 && props.currentStep < stepDescriptions.value.length) {
    return stepDescriptions.value[props.currentStep];
  }
  return '';
});

const progressPercent = computed(() => {
  if (props.currentStep >= stepLabels.value.length - 1) return 100;
  return (props.currentStep / (stepLabels.value.length - 1)) * 100;
});
</script>
