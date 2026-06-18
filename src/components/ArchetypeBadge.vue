<script setup>
import { Lightbulb } from 'lucide-vue-next';

defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <span
    class="
      inline-flex items-center gap-2.5
      px-6 py-2.5
      rounded-full
      relative
      overflow-hidden
      flex-shrink-0
    "
    :style="{
      background: 'linear-gradient(135deg, rgba(13,148,136,0.12) 0%, rgba(45,212,191,0.06) 50%, rgba(13,148,136,0.10) 100%)',
    }"
  >
    <!-- Animated gradient border via CSS mask -->
    <div
      class="absolute inset-0 rounded-full"
      style="
        padding: 1px;
        background: linear-gradient(135deg, rgba(13,148,136,0.5), rgba(45,212,191,0.2), rgba(13,148,136,0.5));
        background-size: 200% 200%;
        animation: borderShimmer 4s ease infinite;
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        pointer-events: none;
      "
    />

    <!-- Icon -->
    <Lightbulb
      class="w-5 h-5 text-teal-600 dark:text-teal-400 relative z-10 flex-shrink-0"
      stroke-width="1.5"
    />

    <!-- Text -->
    <span
      class="text-base sm:text-lg font-semibold text-teal-800 dark:text-teal-300 relative z-10 whitespace-nowrap"
    >
      {{ text }}
    </span>
  </span>
</template>
