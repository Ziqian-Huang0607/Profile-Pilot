<script setup>
import { Github } from 'lucide-vue-next';
import ArchetypeBadge from './ArchetypeBadge.vue';

const props = defineProps({
  profile: {
    type: Object,
    required: true,
  },
  archetype: {
    type: String,
    default: 'The Developer',
  },
});
</script>

<template>
  <section
    class="
      backdrop-blur-xl bg-white/75
      border border-white/25 rounded-[20px]
      shadow-[0_12px_48px_rgba(0,0,0,0.10)]
      dark:bg-black/55 dark:border-white/8 dark:shadow-[0_12px_48px_rgba(0,0,0,0.35)]
      p-6 sm:p-8
      mb-5
      animate-fade-up-scale
      overflow-hidden
      relative
    "
  >
    <!-- Subtle decorative gradient behind -->
    <div
      class="absolute top-0 right-0 w-64 h-64 opacity-30 dark:opacity-10 pointer-events-none"
      style="background: radial-gradient(circle at top right, rgba(13,148,136,0.12) 0%, transparent 60%);"
    />

    <div class="relative flex flex-col sm:flex-row items-center sm:items-center gap-5 text-center sm:text-left">
      <!-- Avatar -->
      <div class="relative flex-shrink-0">
        <img
          :src="profile.avatar_url || ''"
          :alt="profile.login || ''"
          class="
            w-20 h-20 sm:w-24 sm:h-24
            rounded-2xl
            shadow-[0_4px_16px_rgba(0,0,0,0.10)]
            dark:shadow-[0_4px_16px_rgba(0,0,0,0.30)]
            object-cover
            bg-slate-200 dark:bg-slate-700
          "
        />
        <!-- Online indicator dot -->
        <div
          class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center"
        >
          <div
            class="w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-800"
          />
        </div>
      </div>

      <!-- User info -->
      <div class="flex-1 min-w-0">
        <div
          class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3"
        >
          <h2
            class="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-slate-50 tracking-tight"
          >
            {{ profile.name || profile.login }}
          </h2>
          <a
            :href="`https://github.com/${profile.login}`"
            target="_blank"
            rel="noopener noreferrer"
            class="
              text-sm text-slate-400 dark:text-slate-500
              hover:text-teal-600 dark:hover:text-teal-400
              transition-colors
              inline-flex items-center justify-center sm:justify-start gap-1
            "
          >
            <Github class="w-3.5 h-3.5" />
            @{{ profile.login }}
          </a>
        </div>

        <!-- Archetype Badge -->
        <div class="flex justify-center sm:justify-start">
          <ArchetypeBadge :text="archetype" />
        </div>
      </div>
    </div>
  </section>
</template>
