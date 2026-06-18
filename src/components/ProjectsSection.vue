<script setup>
import { computed } from 'vue';
import { Folder, Star, GitFork } from 'lucide-vue-next';

const props = defineProps({
  projects: {
    type: Array,
    default: () => [],
  },
});

const defaultProjects = [
  {
    name: 'linux',
    description: 'Linux kernel source tree — the core of the world\'s most widely used operating system.',
    url: 'https://github.com/torvalds/linux',
    language: 'C',
    languageColor: '#f59e0b',
    stars: 178000,
    forks: 52000,
  },
  {
    name: 'git',
    description: 'Git source code version control system — the fast, scalable, distributed revision control system.',
    url: 'https://github.com/git/git',
    language: 'C',
    languageColor: '#f59e0b',
    stars: 49000,
    forks: 25000,
  },
  {
    name: 'react',
    description: 'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
    url: 'https://github.com/facebook/react',
    language: 'JavaScript',
    languageColor: '#0d9488',
    stars: 225000,
    forks: 46000,
  },
  {
    name: 'typescript',
    description: 'TypeScript is a superset of JavaScript that compiles to clean JavaScript output.',
    url: 'https://github.com/microsoft/TypeScript',
    language: 'TypeScript',
    languageColor: '#0ea5e9',
    stars: 101000,
    forks: 13000,
  },
  {
    name: 'rust',
    description: 'Empowering everyone to build reliable and efficient software.',
    url: 'https://github.com/rust-lang/rust',
    language: 'Rust',
    languageColor: '#10b981',
    stars: 95000,
    forks: 12000,
  },
  {
    name: 'vue',
    description: 'An approachable, performant and versatile framework for building web user interfaces.',
    url: 'https://github.com/vuejs/core',
    language: 'TypeScript',
    languageColor: '#0ea5e9',
    stars: 47000,
    forks: 8200,
  },
];

const projectList = computed(() =>
  props.projects && props.projects.length > 0 ? props.projects : defaultProjects
);

function formatStars(count) {
  if (count >= 1000) {
    return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return count.toString();
}
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
      animate-fade-up
      overflow-hidden
    "
  >
    <!-- Section header -->
    <div class="flex items-center gap-2.5 mb-6">
      <div
        class="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-900/20 flex items-center justify-center"
      >
        <Folder
          class="w-4 h-4 text-teal-600 dark:text-teal-400"
          stroke-width="2"
        />
      </div>
      <h3
        class="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
      >
        Notable Projects
      </h3>
    </div>

    <!-- Project cards grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      <div
        v-for="(project, i) in projectList"
        :key="project.name"
        class="
          backdrop-blur-md bg-white/60
          border border-white/20 rounded-xl
          shadow-[0_4px_16px_rgba(0,0,0,0.05)]
          dark:bg-white/5 dark:border-white/6 dark:shadow-[0_4px_16px_rgba(0,0,0,0.20)]
          p-5
          group
          transition-all duration-250 ease-smooth
          hover:-translate-y-1 hover:border-white/40 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]
          dark:hover:border-white/15 dark:hover:shadow-[0_8px_24px_rgba(0,0,0,0.30)]
          animate-fade-up
        "
        :style="{ animationDelay: `${i * 80}ms` }"
      >
        <!-- Repo name + external link -->
        <div class="flex items-start justify-between mb-3">
          <a
            :href="project.url"
            target="_blank"
            rel="noopener noreferrer"
            class="
              font-semibold text-slate-800 dark:text-slate-100
              group-hover:text-teal-700 dark:group-hover:text-teal-400
              transition-colors
              flex items-center gap-1.5
              text-sm sm:text-base
            "
          >
            <Folder
              class="w-4 h-4 text-slate-400 flex-shrink-0"
              stroke-width="2"
            />
            {{ project.name }}
          </a>
          <div class="flex items-center gap-1 text-slate-500 dark:text-slate-400 flex-shrink-0">
            <Star class="w-3.5 h-3.5 fill-current" />
            <span class="text-xs">{{ formatStars(project.stars) }}</span>
          </div>
        </div>

        <!-- Description -->
        <p
          class="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2 leading-relaxed"
        >
          {{ project.description }}
        </p>

        <!-- Stats row -->
        <div class="flex items-center gap-4">
          <!-- Language -->
          <span
            class="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400"
          >
            <span
              class="w-2.5 h-2.5 rounded-full"
              :style="{ backgroundColor: project.languageColor }"
            />
            {{ project.language }}
          </span>

          <!-- Stars -->
          <span
            class="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400"
          >
            <Star class="w-3.5 h-3.5" />
            {{ formatStars(project.stars) }}
          </span>

          <!-- Forks -->
          <span
            class="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400"
          >
            <GitFork class="w-3.5 h-3.5" />
            {{ formatStars(project.forks) }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
