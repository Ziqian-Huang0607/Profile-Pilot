<template>
  <section ref="sectionRef" class="py-16 sm:py-24 px-6 md:px-12">
    <div class="max-w-[1200px] mx-auto">
      <!-- Section header -->
      <div
        class="text-center mb-10 sm:mb-14"
        :class="{ 'animate-fade-up': isVisible }"
      >
        <span
          class="
            inline-block text-xs font-semibold uppercase tracking-wider
            text-teal-600 dark:text-teal-400
            mb-3
          "
        >
          {{ $t('features.label') }}
        </span>
        <h2
          class="
            text-[1.25rem] sm:text-[1.5rem]
            font-semibold
            leading-[1.3]
            tracking-[-0.01em]
            text-slate-900 dark:text-slate-50
            mb-3
          "
        >
          {{ $t('features.heading') }}
        </h2>
        <p
          class="
            text-base text-slate-500 dark:text-slate-400
            max-w-lg mx-auto
            leading-relaxed
          "
        >
          {{ $t('features.description') }}
        </p>
      </div>

      <!-- Feature cards grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <!-- Card 1: Overall Summary -->
        <div
          class="
            backdrop-blur-lg bg-white/70
            border border-white/25 rounded-2xl
            shadow-[0_8px_32px_rgba(0,0,0,0.08)]
            dark:bg-black/55 dark:border-white/8 dark:shadow-[0_8px_32px_rgba(0,0,0,0.30)]
            p-6 sm:p-7
            group
            transition-all duration-250 ease-smooth
            hover:-translate-y-1 hover:border-white/45 hover:shadow-[0_12px_48px_rgba(0,0,0,0.12)]
            dark:hover:border-white/18 dark:hover:shadow-[0_12px_48px_rgba(0,0,0,0.40)]
            animate-fade-up
          "
          :class="{ 'animate-visible': isVisible }"
          style="animation-delay: 0ms;"
        >
          <div
            class="
              w-12 h-12 rounded-xl
              bg-teal-600/10 dark:bg-teal-500/10
              flex items-center justify-center
              mb-5
              transition-transform duration-300 ease-smooth
              group-hover:scale-110
            "
          >
            <svg
              class="w-6 h-6 text-teal-600 dark:text-teal-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3
            class="
              text-[1.125rem] font-medium
              text-slate-900 dark:text-slate-50
              mb-2
            "
          >
            {{ $t('features[0].title') }}
          </h3>
          <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            {{ $t('features[0].description') }}
          </p>
        </div>

        <!-- Card 2: Key Technical Skills -->
        <div
          class="
            backdrop-blur-lg bg-white/70
            border border-white/25 rounded-2xl
            shadow-[0_8px_32px_rgba(0,0,0,0.08)]
            dark:bg-black/55 dark:border-white/8 dark:shadow-[0_8px_32px_rgba(0,0,0,0.30)]
            p-6 sm:p-7
            group
            transition-all duration-250 ease-smooth
            hover:-translate-y-1 hover:border-white/45 hover:shadow-[0_12px_48px_rgba(0,0,0,0.12)]
            dark:hover:border-white/18 dark:hover:shadow-[0_12px_48px_rgba(0,0,0,0.40)]
            animate-fade-up
          "
          :class="{ 'animate-visible': isVisible }"
          style="animation-delay: 80ms;"
        >
          <div
            class="
              w-12 h-12 rounded-xl
              bg-teal-600/10 dark:bg-teal-500/10
              flex items-center justify-center
              mb-5
              transition-transform duration-300 ease-smooth
              group-hover:scale-110
            "
          >
            <svg
              class="w-6 h-6 text-teal-600 dark:text-teal-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h3
            class="
              text-[1.125rem] font-medium
              text-slate-900 dark:text-slate-50
              mb-2
            "
          >
            {{ $t('features[1].title') }}
          </h3>
          <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            {{ $t('features[1].description') }}
          </p>
        </div>

        <!-- Card 3: Notable Projects -->
        <div
          class="
            backdrop-blur-lg bg-white/70
            border border-white/25 rounded-2xl
            shadow-[0_8px_32px_rgba(0,0,0,0.08)]
            dark:bg-black/55 dark:border-white/8 dark:shadow-[0_8px_32px_rgba(0,0,0,0.30)]
            p-6 sm:p-7
            group
            transition-all duration-250 ease-smooth
            hover:-translate-y-1 hover:border-white/45 hover:shadow-[0_12px_48px_rgba(0,0,0,0.12)]
            dark:hover:border-white/18 dark:hover:shadow-[0_12px_48px_rgba(0,0,0,0.40)]
            animate-fade-up
          "
          :class="{ 'animate-visible': isVisible }"
          style="animation-delay: 160ms;"
        >
          <div
            class="
              w-12 h-12 rounded-xl
              bg-teal-600/10 dark:bg-teal-500/10
              flex items-center justify-center
              mb-5
              transition-transform duration-300 ease-smooth
              group-hover:scale-110
            "
          >
            <svg
              class="w-6 h-6 text-teal-600 dark:text-teal-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3
            class="
              text-[1.125rem] font-medium
              text-slate-900 dark:text-slate-50
              mb-2
            "
          >
            {{ $t('features[2].title') }}
          </h3>
          <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            {{ $t('features[2].description') }}
          </p>
        </div>

        <!-- Card 4: Developer Archetype -->
        <div
          class="
            backdrop-blur-lg bg-white/70
            border border-white/25 rounded-2xl
            shadow-[0_8px_32px_rgba(0,0,0,0.08)]
            dark:bg-black/55 dark:border-white/8 dark:shadow-[0_8px_32px_rgba(0,0,0,0.30)]
            p-6 sm:p-7
            group
            transition-all duration-250 ease-smooth
            hover:-translate-y-1 hover:border-white/45 hover:shadow-[0_12px_48px_rgba(0,0,0,0.12)]
            dark:hover:border-white/18 dark:hover:shadow-[0_12px_48px_rgba(0,0,0,0.40)]
            animate-fade-up
          "
          :class="{ 'animate-visible': isVisible }"
          style="animation-delay: 240ms;"
        >
          <div
            class="
              w-12 h-12 rounded-xl
              bg-teal-600/10 dark:bg-teal-500/10
              flex items-center justify-center
              mb-5
              transition-transform duration-300 ease-smooth
              group-hover:scale-110
            "
          >
            <svg
              class="w-6 h-6 text-teal-600 dark:text-teal-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3
            class="
              text-[1.125rem] font-medium
              text-slate-900 dark:text-slate-50
              mb-2
            "
          >
            {{ $t('features[3].title') }}
          </h3>
          <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            {{ $t('features[3].description') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const sectionRef = ref(null);
const isVisible = ref(false);

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  if (sectionRef.value) {
    observer.observe(sectionRef.value);
  }
});
</script>
