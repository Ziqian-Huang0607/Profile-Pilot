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
          {{ $t('demo.label') }}
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
          {{ $t('demo.heading') }}
        </h2>
        <p
          class="
            text-base text-slate-500 dark:text-slate-400
            max-w-lg mx-auto
            leading-relaxed
          "
        >
          {{ $t('demo.description') }}
        </p>
      </div>

      <!-- Preview mockup card -->
      <div
        class="
          max-w-3xl mx-auto
          backdrop-blur-xl bg-white/70
          border border-white/25 rounded-[20px]
          shadow-[0_12px_48px_rgba(0,0,0,0.10)]
          dark:bg-black/50 dark:border-white/8 dark:shadow-[0_12px_48px_rgba(0,0,0,0.40)]
          overflow-hidden
          animate-fade-up-scale
        "
      >
        <!-- Mockup browser chrome -->
        <div
          class="
            px-5 py-3.5
            border-b border-black/5 dark:border-white/6
            flex items-center gap-2
            bg-white/40 dark:bg-white/[0.03]
          "
        >
          <!-- Window dots -->
          <div class="flex items-center gap-1.5">
            <div class="w-3 h-3 rounded-full bg-red-400/70" />
            <div class="w-3 h-3 rounded-full bg-amber-400/70" />
            <div class="w-3 h-3 rounded-full bg-emerald-400/70" />
          </div>
          <!-- Mock URL bar -->
          <div
            class="
              ml-4 flex-1 max-w-xs
              bg-white/50 dark:bg-white/[0.08]
              rounded-lg px-3 py-1
              text-xs text-slate-400 dark:text-slate-500
            "
          >
            profile-pilot.app/report/torvalds
          </div>
        </div>

        <!-- Mockup content -->
        <div class="p-6 sm:p-8">
          <!-- Profile header mockup -->
          <div class="flex items-center gap-4 mb-8">
            <div
              class="
                w-16 h-16 rounded-2xl
                bg-gradient-to-br from-teal-500 to-teal-700
                flex items-center justify-center
                text-white text-xl font-semibold
              "
            >
              LT
            </div>
            <div>
              <div class="text-lg font-semibold text-slate-800 dark:text-slate-100">
                torvalds
              </div>
              <div
                class="
                  inline-flex items-center gap-1.5 mt-1
                  px-3 py-1 rounded-full
                  bg-teal-100 dark:bg-teal-900/30
                  text-teal-700 dark:text-teal-300
                  text-xs font-medium
                "
              >
                <svg
                  class="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                The Foundational Architect
              </div>
            </div>
          </div>

          <!-- Summary card mockup -->
          <div
            class="
              backdrop-blur-md bg-white/50
              border border-white/20 rounded-xl
              p-5 mb-6
              dark:bg-white/[0.05] dark:border-white/[0.06]
            "
          >
            <h3
              class="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2"
            >
              Overall Summary
            </h3>
            <div class="space-y-2">
              <div class="h-3 bg-slate-200/60 dark:bg-white/10 rounded w-full" />
              <div class="h-3 bg-slate-200/60 dark:bg-white/10 rounded w-[90%]" />
              <div class="h-3 bg-slate-200/60 dark:bg-white/10 rounded w-[75%]" />
              <div class="h-3 bg-slate-200/60 dark:bg-white/10 rounded w-[85%]" />
            </div>
          </div>

          <!-- Skills mockup -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <!-- Language bars mockup -->
            <div
              class="
                backdrop-blur-md bg-white/50
                border border-white/20 rounded-xl
                p-5
                dark:bg-white/[0.05] dark:border-white/[0.06]
              "
            >
              <h3
                class="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-4"
              >
                Key Technical Skills
              </h3>
              <div class="space-y-3">
                <!-- C -->
                <div>
                  <div class="flex justify-between text-xs mb-1">
                    <span class="text-slate-600 dark:text-slate-300">C</span>
                    <span class="text-slate-400">84%</span>
                  </div>
                  <div class="h-2 rounded-full bg-slate-200/60 dark:bg-white/10 overflow-hidden">
                    <div
                      class="h-full bg-teal-600 rounded-full"
                      style="width: 84%"
                    />
                  </div>
                </div>
                <!-- Shell -->
                <div>
                  <div class="flex justify-between text-xs mb-1">
                    <span class="text-slate-600 dark:text-slate-300">Shell</span>
                    <span class="text-slate-400">12%</span>
                  </div>
                  <div class="h-2 rounded-full bg-slate-200/60 dark:bg-white/10 overflow-hidden">
                    <div
                      class="h-full bg-amber-500 rounded-full"
                      style="width: 12%"
                    />
                  </div>
                </div>
                <!-- Perl -->
                <div>
                  <div class="flex justify-between text-xs mb-1">
                    <span class="text-slate-600 dark:text-slate-300">Perl</span>
                    <span class="text-slate-400">4%</span>
                  </div>
                  <div class="h-2 rounded-full bg-slate-200/60 dark:bg-white/10 overflow-hidden">
                    <div
                      class="h-full bg-sky-500 rounded-full"
                      style="width: 4%"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Radar chart placeholder mockup -->
            <div
              class="
                backdrop-blur-md bg-white/50
                border border-white/20 rounded-xl
                p-5 flex items-center justify-center
                dark:bg-white/[0.05] dark:border-white/[0.06]
              "
            >
              <div class="relative w-32 h-32">
                <svg viewBox="0 0 100 100" class="w-full h-full opacity-60">
                  <polygon
                    points="50,10 85,35 75,80 25,80 15,35"
                    fill="none"
                    stroke="rgba(13,148,136,0.3)"
                    stroke-width="1"
                  />
                  <polygon
                    points="50,5 90,32 78,85 22,85 10,32"
                    fill="none"
                    stroke="rgba(13,148,136,0.2)"
                    stroke-width="1"
                  />
                  <polygon
                    points="50,20 75,38 68,72 32,72 25,38"
                    fill="rgba(13,148,136,0.15)"
                    stroke="rgba(13,148,136,0.4)"
                    stroke-width="1.5"
                  />
                  <line
                    x1="50" y1="50" x2="50" y2="10"
                    stroke="rgba(13,148,136,0.3)"
                    stroke-width="1"
                  />
                  <line
                    x1="50" y1="50" x2="85" y2="35"
                    stroke="rgba(13,148,136,0.3)"
                    stroke-width="1"
                  />
                  <line
                    x1="50" y1="50" x2="75" y2="80"
                    stroke="rgba(13,148,136,0.3)"
                    stroke-width="1"
                  />
                  <line
                    x1="50" y1="50" x2="25" y2="80"
                    stroke="rgba(13,148,136,0.3)"
                    stroke-width="1"
                  />
                  <line
                    x1="50" y1="50" x2="15" y2="35"
                    stroke="rgba(13,148,136,0.3)"
                    stroke-width="1"
                  />
                </svg>
              </div>
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
