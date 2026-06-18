<script setup>
import { computed } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js';
import { BarChart3 } from 'lucide-vue-next';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const props = defineProps({
  chartData: {
    type: Object,
    default: null,
  },
  stats: {
    type: Object,
    default: null,
  },
  isDark: {
    type: Boolean,
    default: false,
  },
});

const defaultLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const defaultData = [42, 68, 55, 87, 120, 95, 78, 110, 145, 130, 88, 62];

const contributionChartData = computed(() => {
  if (props.chartData) {
    return {
      labels: props.chartData.labels,
      datasets: [
        {
          data: props.chartData.data,
          borderRadius: 4,
          backgroundColor: (ctx) => {
            const canvas = ctx.chart.ctx;
            if (!canvas) return 'rgba(13, 148, 136, 0.7)';
            const chartArea = ctx.chart.chartArea;
            if (!chartArea) return 'rgba(13, 148, 136, 0.7)';
            const gradient = canvas.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            gradient.addColorStop(0, 'rgba(13, 148, 136, 0.7)');
            gradient.addColorStop(1, 'rgba(13, 148, 136, 0.2)');
            return gradient;
          },
          hoverBackgroundColor: 'rgba(13, 148, 136, 0.85)',
        },
      ],
    };
  }
  return {
    labels: defaultLabels,
    datasets: [
      {
        data: defaultData,
        borderRadius: 4,
        backgroundColor: (ctx) => {
          const canvas = ctx.chart.ctx;
          if (!canvas) return 'rgba(13, 148, 136, 0.7)';
          const chartArea = ctx.chart.chartArea;
          if (!chartArea) return 'rgba(13, 148, 136, 0.7)';
          const gradient = canvas.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, 'rgba(13, 148, 136, 0.7)');
          gradient.addColorStop(1, 'rgba(13, 148, 136, 0.2)');
          return gradient;
        },
        hoverBackgroundColor: 'rgba(13, 148, 136, 0.85)',
      },
    ],
  };
});

const contributionChartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      titleFont: { family: 'Inter', size: 12 },
      bodyFont: { family: 'Inter', size: 12 },
      padding: 10,
      cornerRadius: 8,
      displayColors: false,
      callbacks: {
        label: (ctx) => `${ctx.raw} commits`,
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        font: { family: 'Inter', size: 11 },
        color: props.isDark ? '#64748b' : '#94a3b8',
        maxRotation: 0,
      },
      border: { display: false },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: props.isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
        drawBorder: false,
      },
      ticks: {
        font: { family: 'Inter', size: 11 },
        color: props.isDark ? '#64748b' : '#94a3b8',
        maxTicksLimit: 5,
      },
      border: { display: false },
    },
  },
}));

const defaultStats = {
  totalCommits: 1080,
  totalRepos: 42,
  accountAge: 8,
};

const displayStats = computed(() => props.stats || defaultStats);

// Timeline fallback data
const timelineEvents = [
  { description: 'Created repository vuejs/core — a progressive JavaScript framework', date: '2024-11-15' },
  { description: 'Merged 12 pull requests in torvalds/linux', date: '2024-11-10' },
  { description: 'Released TypeScript v5.7 with performance improvements', date: '2024-11-05' },
  { description: 'Contributed 156 commits across 8 repositories', date: '2024-10-28' },
  { description: 'Started watching facebook/react and 3 other repositories', date: '2024-10-20' },
];
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
        <BarChart3
          class="w-4 h-4 text-teal-600 dark:text-teal-400"
          stroke-width="2"
        />
      </div>
      <h3
        class="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
      >
        Contribution Activity
      </h3>
    </div>

    <!-- Bar chart container (if we have data) -->
    <div
      v-if="chartData || true"
      class="
        backdrop-blur-md bg-white/40
        border border-white/15 rounded-xl
        p-4 sm:p-6
        dark:bg-white/4 dark:border-white/5
        min-h-[240px] sm:min-h-[280px]
      "
    >
      <Bar
        :data="contributionChartData"
        :options="contributionChartOptions"
        class="w-full"
      />
    </div>

    <!-- Timeline fallback (shown when no chart data) -->
    <div
      v-else
      class="
        backdrop-blur-md bg-white/40
        border border-white/15 rounded-xl
        p-5 sm:p-6
        dark:bg-white/4 dark:border-white/5
      "
    >
      <div class="space-y-3">
        <div
          v-for="(event, i) in timelineEvents"
          :key="i"
          class="flex items-start gap-4 animate-fade-up"
          :style="{ animationDelay: `${i * 50}ms` }"
        >
          <!-- Timeline dot -->
          <div class="flex flex-col items-center">
            <div class="w-2.5 h-2.5 rounded-full bg-teal-500 mt-1.5" />
            <div
              v-if="i < timelineEvents.length - 1"
              class="w-px h-full bg-slate-200 dark:bg-white/10 mt-1"
              style="min-height: 24px;"
            />
          </div>
          <!-- Event content -->
          <div class="pb-5">
            <p class="text-sm text-slate-700 dark:text-slate-300">
              {{ event.description }}
            </p>
            <span class="text-xs text-slate-400 dark:text-slate-500">{{ event.date }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick stats row -->
    <div class="grid grid-cols-3 gap-4 mt-5">
      <div class="text-center">
        <div
          class="text-xl sm:text-2xl font-semibold text-slate-800 dark:text-slate-100 tabular-nums"
        >
          {{ displayStats.totalCommits.toLocaleString() }}
        </div>
        <div class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Total Commits
        </div>
      </div>
      <div class="text-center">
        <div
          class="text-xl sm:text-2xl font-semibold text-slate-800 dark:text-slate-100 tabular-nums"
        >
          {{ displayStats.totalRepos.toLocaleString() }}
        </div>
        <div class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Public Repos
        </div>
      </div>
      <div class="text-center">
        <div
          class="text-xl sm:text-2xl font-semibold text-slate-800 dark:text-slate-100 tabular-nums"
        >
          {{ displayStats.accountAge }}
        </div>
        <div class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Years on GitHub
        </div>
      </div>
    </div>
  </section>
</template>
