<template>
  <section ref="sectionRef" class="py-12 sm:py-16 px-6 md:px-12">
    <div class="max-w-[1200px] mx-auto">
      <div
        class="
          backdrop-blur-lg bg-white/60
          border border-white/20 rounded-2xl
          shadow-[0_8px_32px_rgba(0,0,0,0.06)]
          dark:bg-black/45 dark:border-white/8 dark:shadow-[0_8px_32px_rgba(0,0,0,0.25)]
          p-6 sm:p-8
          flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10
          animate-fade-up
        "
        :class="{ 'animate-visible': isVisible }"
      >
        <!-- Stars -->
        <a
          href="https://github.com/Ziqian-Huang0607/Profile-Pilot"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-3 group"
        >
          <div
            class="
              w-10 h-10 rounded-xl
              bg-amber-100 dark:bg-amber-900/20
              flex items-center justify-center
              transition-transform duration-200 ease-smooth
              group-hover:scale-110
            "
          >
            <svg
              class="w-5 h-5 text-amber-600 dark:text-amber-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <div>
            <div class="text-xl font-semibold text-slate-800 dark:text-slate-100">
              {{ $t('social.stars') }}
            </div>
            <div class="text-sm text-slate-500 dark:text-slate-400">
              GitHub Stars
            </div>
          </div>
        </a>

        <!-- Divider -->
        <div class="w-px h-10 bg-slate-200 dark:bg-white/10 hidden sm:block" />
        <div class="w-16 h-px bg-slate-200 dark:bg-white/10 sm:hidden" />

        <!-- Forks -->
        <a
          href="https://github.com/Ziqian-Huang0607/Profile-Pilot"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-3 group"
        >
          <div
            class="
              w-10 h-10 rounded-xl
              bg-sky-100 dark:bg-sky-900/20
              flex items-center justify-center
              transition-transform duration-200 ease-smooth
              group-hover:scale-110
            "
          >
            <svg
              class="w-5 h-5 text-sky-600 dark:text-sky-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M7 3a2 2 0 012 2v5.59l-2.29 2.3a1 1 0 000 1.42l2.29 2.3V19a2 2 0 01-2 2 2 2 0 01-2-2V5a2 2 0 012-2zM17 21a2 2 0 01-2-2v-2.59l2.29-2.3a1 1 0 000-1.42l-2.29-2.3V5a2 2 0 012-2 2 2 0 012 2v14a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <div class="text-xl font-semibold text-slate-800 dark:text-slate-100">
              {{ $t('social.forks') }}
            </div>
            <div class="text-sm text-slate-500 dark:text-slate-400">
              Forks
            </div>
          </div>
        </a>

        <!-- Divider -->
        <div class="w-px h-10 bg-slate-200 dark:bg-white/10 hidden sm:block" />
        <div class="w-16 h-px bg-slate-200 dark:bg-white/10 sm:hidden" />

        <!-- Open source note -->
        <div class="flex items-center gap-3">
          <div
            class="
              w-10 h-10 rounded-xl
              bg-teal-100 dark:bg-teal-900/20
              flex items-center justify-center
            "
          >
            <svg
              class="w-5 h-5 text-teal-600 dark:text-teal-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <div>
            <div class="text-sm font-medium text-slate-700 dark:text-slate-300">
              {{ $t('social.tagline') }}
            </div>
            <div class="text-sm text-slate-500 dark:text-slate-400">
              {{ $t('social.subtitle') }}
            </div>
          </div>
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
