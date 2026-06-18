<script setup>
import { computed } from 'vue';
import { Radar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js';
import { Code2 } from 'lucide-vue-next';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

const props = defineProps({
  skills: {
    type: Array,
    default: () => [],
  },
  radarData: {
    type: Object,
    default: null,
  },
  isDark: {
    type: Boolean,
    default: false,
  },
});

// --- Default / sample data ---
const defaultSkills = [
  { name: 'JavaScript', percent: 85, color: '#0d9488' },
  { name: 'TypeScript', percent: 72, color: '#0ea5e9' },
  { name: 'CSS', percent: 64, color: '#8b5cf6' },
  { name: 'HTML', percent: 58, color: '#f59e0b' },
  { name: 'Python', percent: 45, color: '#0ea5e9' },
  { name: 'Shell', percent: 32, color: '#ec4899' },
  { name: 'Go', percent: 20, color: '#10b981' },
  { name: 'Rust', percent: 15, color: '#10b981' },
];

const languageList = computed(() =>
  props.skills && props.skills.length > 0 ? props.skills : defaultSkills
);

const defaultRadarLabels = [
  'Language Proficiency',
  'Framework Diversity',
  'Project Complexity',
  'Community Engagement',
  'Documentation',
  'Testing',
];

const defaultRadarValues = [82, 68, 75, 60, 55, 70];

const radarChartData = computed(() => {
  if (props.radarData) {
    return {
      labels: props.radarData.labels,
      datasets: [
        {
          data: props.radarData.datasets[0].data,
          borderWidth: 2,
          borderColor: 'rgba(13, 148, 136, 0.7)',
          backgroundColor: 'rgba(13, 148, 136, 0.12)',
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: 'rgba(13, 148, 136, 0.8)',
          pointBorderColor: 'rgba(13, 148, 136, 0.3)',
          pointBorderWidth: 2,
        },
      ],
    };
  }
  return {
    labels: defaultRadarLabels,
    datasets: [
      {
        data: defaultRadarValues,
        borderWidth: 2,
        borderColor: 'rgba(13, 148, 136, 0.7)',
        backgroundColor: 'rgba(13, 148, 136, 0.12)',
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: 'rgba(13, 148, 136, 0.8)',
        pointBorderColor: 'rgba(13, 148, 136, 0.3)',
        pointBorderWidth: 2,
      },
    ],
  };
});

const radarChartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      titleFont: { family: 'Inter', size: 13 },
      bodyFont: { family: 'Inter', size: 12 },
      padding: 10,
      cornerRadius: 8,
      displayColors: false,
    },
  },
  scales: {
    r: {
      beginAtZero: true,
      max: 100,
      ticks: {
        display: false,
        stepSize: 20,
      },
      grid: {
        color: 'rgba(148, 163, 184, 0.15)',
        circular: true,
      },
      angleLines: {
        color: 'rgba(148, 163, 184, 0.1)',
      },
      pointLabels: {
        font: {
          family: 'Inter',
          size: 11,
          weight: '500',
        },
        color: props.isDark ? '#94a3b8' : '#64748b',
      },
    },
  },
}));
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
        <Code2
          class="w-4 h-4 text-teal-600 dark:text-teal-400"
          stroke-width="2"
        />
      </div>
      <h3
        class="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
      >
        Key Technical Skills
      </h3>
    </div>

    <!-- Two-column layout -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      <!-- Left: Radar Chart -->
      <div
        class="
          backdrop-blur-md bg-white/40
          border border-white/15 rounded-xl
          p-5 sm:p-6
          dark:bg-white/4 dark:border-white/5
          flex items-center justify-center
          min-h-[280px]
        "
      >
        <Radar
          :data="radarChartData"
          :options="radarChartOptions"
          class="w-full max-w-[280px] sm:max-w-[320px]"
        />
      </div>

      <!-- Right: Language Bars -->
      <div class="space-y-4">
        <div
          v-for="(lang, i) in languageList"
          :key="lang.name"
          class="animate-fade-up"
          :style="{ animationDelay: `${i * 60}ms` }"
        >
          <div class="flex items-center justify-between mb-1.5">
            <div class="flex items-center gap-2.5">
              <span
                class="w-3 h-3 rounded-full flex-shrink-0"
                :style="{ backgroundColor: lang.color }"
              />
              <span
                class="text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                {{ lang.name }}
              </span>
            </div>
            <span
              class="text-sm text-slate-500 dark:text-slate-400 font-medium tabular-nums"
            >
              {{ lang.percent }}%
            </span>
          </div>
          <div
            class="h-2.5 rounded-full bg-slate-200/60 dark:bg-white/8 overflow-hidden"
          >
            <div
              class="h-full rounded-full transition-all duration-700 ease-smooth"
              :style="{
                width: lang.percent + '%',
                backgroundColor: lang.color,
                transitionDelay: `${i * 60}ms`,
              }"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
