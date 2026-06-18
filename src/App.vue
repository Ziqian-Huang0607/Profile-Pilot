<template>
  <div class="relative min-h-screen flex flex-col">
    <!-- Background Layer: fixed animated mesh gradient -->
    <BackgroundLayer />

    <!-- Navigation: floating glassmorphism pill -->
    <Navbar />

    <!-- Main Content -->
    <main class="relative z-0 flex-1">
      <!-- Hero Section -->
      <section class="pt-32 pb-16 sm:pt-40 sm:pb-24 px-6 md:px-12">
        <div class="max-w-[1200px] mx-auto">
          <div class="text-center max-w-2xl mx-auto mb-10">
            <h1 class="text-hero text-center mb-5">
              <span class="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-700 dark:from-teal-400 dark:via-teal-300 dark:to-teal-400 bg-clip-text text-transparent">
                Analyze any GitHub profile
              </span>
              <br>
              <span class="text-slate-700 dark:text-slate-200">with AI-powered insights</span>
            </h1>
            <p class="text-base sm:text-lg text-slate-500 dark:text-slate-400 text-center max-w-lg mx-auto leading-relaxed">
              {{ t('subtitle') }}
            </p>
          </div>

          <!-- Search Input -->
          <div class="relative w-full max-w-xl mx-auto backdrop-blur-xl bg-white/80 border border-white/30 rounded-2xl shadow-input dark:bg-black/60 dark:border-white/12 dark:shadow-input-dark p-2 flex items-center gap-2 transition-all duration-300 ease-default focus-within:border-teal-500/40 focus-within:shadow-[0_0_0_3px_rgba(13,148,136,0.12),0_8px_32px_rgba(0,0,0,0.08)] dark:focus-within:shadow-[0_0_0_3px_rgba(20,184,166,0.15),0_8px_32px_rgba(0,0,0,0.35)]">
            <div class="pl-3 flex-shrink-0">
              <svg class="w-5 h-5 text-slate-400 dark:text-slate-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </div>
            <input v-model="username" type="text" :placeholder="t('placeholder')" class="flex-1 bg-transparent border-none outline-none px-2 py-3 text-base text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 font-normal" @keydown.enter="handleAnalyze" :disabled="loading" />
            <button @click="handleAnalyze" :disabled="!username.trim() || loading" class="flex-shrink-0 bg-teal-600 text-white rounded-xl px-6 py-3 font-medium text-sm transition-all duration-200 ease-spring hover:bg-teal-700 hover:shadow-btn-primary hover:scale-[1.02] active:bg-teal-800 active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none focus:outline-none focus:ring-2 focus:ring-teal-600/30">
              <span v-if="!loading">{{ t('analyze') }}</span>
              <span v-else class="flex items-center gap-2">
                <svg class="w-4 h-4 animate-gentle-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Analyzing...
              </span>
            </button>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="w-full max-w-xl mx-auto mt-6 backdrop-blur-xl bg-white/80 border border-white/30 rounded-2xl shadow-glass-1 dark:bg-black/60 dark:border-white/12 dark:shadow-glass-1-dark p-6 sm:p-8 text-center animate-fade-up">
            <div class="flex items-center justify-center gap-2 sm:gap-3 mb-6 flex-wrap">
              <template v-for="(step, i) in steps" :key="i">
                <div class="flex items-center gap-2">
                  <div class="relative">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-400 ease-smooth" :class="{ 'bg-teal-600 text-white': step.completed, 'bg-teal-600 text-white animate-pulse': step.active, 'bg-slate-200 text-slate-400 dark:bg-white/10 dark:text-slate-500': step.pending }">
                      <svg v-if="step.completed" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path d="M5 13l4 4L19 7"/></svg>
                      <span v-else class="text-xs font-semibold">{{ i + 1 }}</span>
                    </div>
                  </div>
                  <span class="text-xs sm:text-sm transition-colors duration-300 whitespace-nowrap" :class="{ 'text-slate-800 dark:text-slate-100 font-medium': step.active || step.completed, 'text-slate-400 dark:text-slate-500': step.pending }">{{ step.label }}</span>
                </div>
                <div v-if="i < steps.length - 1" class="w-4 sm:w-8 h-px transition-colors duration-400" :class="{ 'bg-teal-500/40': step.completed, 'bg-slate-200 dark:bg-white/10': !step.completed }"></div>
              </template>
            </div>
            <p class="text-sm text-slate-500 dark:text-slate-400 animate-fade-in">{{ currentStepDescription }}</p>
            <div class="mt-4 w-full h-1 rounded-full bg-slate-200/60 dark:bg-white/10 overflow-hidden">
              <div class="h-full bg-teal-600 rounded-full transition-all duration-500 ease-smooth" :style="{ width: progressPercent + '%' }" />
            </div>
          </div>

          <!-- Error State -->
          <div v-if="errorMessage" class="w-full max-w-xl mx-auto mt-6 backdrop-blur-lg bg-red-50/80 border border-red-200/50 rounded-2xl shadow-error dark:bg-red-900/20 dark:border-red-700/20 p-4 sm:p-5 flex items-start gap-3 animate-fade-up">
            <div class="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-800/30 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg class="w-4 h-4 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-sm font-semibold text-red-800 dark:text-red-300 mb-1">{{ errorTitle }}</h3>
              <p class="text-sm text-red-600 dark:text-red-400">{{ errorMessage }}</p>
            </div>
            <button @click="clearError" class="flex-shrink-0 text-red-400 hover:text-red-600 dark:text-red-500 dark:hover:text-red-300 transition-colors" aria-label="Dismiss error">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
        </div>
      </section>

      <!-- Demo Preview Section -->
      <section class="py-16 sm:py-24 px-6 md:px-12">
        <div class="max-w-[1200px] mx-auto">
          <div class="text-center">
            <span class="inline-block text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-3">See what you get</span>
            <h2 class="text-h2 text-slate-900 dark:text-slate-50 mb-3">A complete developer profile report</h2>
            <p class="text-body text-slate-500 dark:text-slate-400 max-w-lg mx-auto mb-10">Every report includes a detailed AI-generated analysis with skills breakdown, notable projects, and a developer archetype.</p>
          </div>
          <div class="max-w-3xl mx-auto backdrop-blur-xl bg-white/70 border border-white/25 rounded-[20px] shadow-glass-2 dark:bg-black/50 dark:border-white/8 dark:shadow-glass-2-dark overflow-hidden">
            <div class="px-5 py-3.5 border-b border-black/5 dark:border-white/6 flex items-center gap-2 bg-white/40 dark:bg-white/3">
              <div class="flex items-center gap-1.5">
                <div class="w-3 h-3 rounded-full bg-red-400/70"></div>
                <div class="w-3 h-3 rounded-full bg-amber-400/70"></div>
                <div class="w-3 h-3 rounded-full bg-emerald-400/70"></div>
              </div>
              <div class="ml-4 flex-1 max-w-xs bg-white/50 dark:bg-white/8 rounded-lg px-3 py-1 text-xs text-slate-400 dark:text-slate-500">profile-pilot.app/report/torvalds</div>
            </div>
            <div class="p-6 sm:p-8">
              <div class="flex items-center gap-4 mb-8">
                <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white text-xl font-semibold">LT</div>
                <div class="space-y-2">
                  <div class="h-4 bg-slate-200/60 dark:bg-white/10 rounded w-32"></div>
                  <div class="h-3 bg-slate-200/60 dark:bg-white/10 rounded w-48"></div>
                </div>
              </div>
              <div class="backdrop-blur-md bg-white/50 border border-white/20 rounded-xl p-5 mb-6 dark:bg-white/5 dark:border-white/6">
                <div class="h-3 bg-slate-200/60 dark:bg-white/10 rounded w-32 mb-3"></div>
                <div class="space-y-2">
                  <div class="h-2.5 bg-slate-200/60 dark:bg-white/10 rounded w-full"></div>
                  <div class="h-2.5 bg-slate-200/60 dark:bg-white/10 rounded w-[90%]"></div>
                  <div class="h-2.5 bg-slate-200/60 dark:bg-white/10 rounded w-[75%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-16 sm:py-24 px-6 md:px-12">
        <div class="max-w-[1200px] mx-auto">
          <div class="text-center mb-10 sm:mb-14">
            <span class="inline-block text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-3">What's inside</span>
            <h2 class="text-h2 text-slate-900 dark:text-slate-50 mb-3">Every report includes</h2>
            <p class="text-body text-slate-500 dark:text-slate-400 max-w-lg mx-auto">Our AI-powered analysis generates a comprehensive report with these key sections.</p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div class="glass-card p-6 sm:p-7 group animate-fade-up" style="animation-delay: 0ms;">
              <div class="w-12 h-12 rounded-xl bg-teal-600/10 dark:bg-teal-500/10 flex items-center justify-center mb-5 transition-transform duration-300 ease-smooth group-hover:scale-110">
                <svg class="w-6 h-6 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              </div>
              <h3 class="text-h4 text-slate-900 dark:text-slate-50 mb-2">Overall Summary</h3>
              <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">A concise AI-generated overview of the developer's experience, focus areas, and contributions.</p>
            </div>
            <div class="glass-card p-6 sm:p-7 group animate-fade-up" style="animation-delay: 80ms;">
              <div class="w-12 h-12 rounded-xl bg-teal-600/10 dark:bg-teal-500/10 flex items-center justify-center mb-5 transition-transform duration-300 ease-smooth group-hover:scale-110">
                <svg class="w-6 h-6 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
              </div>
              <h3 class="text-h4 text-slate-900 dark:text-slate-50 mb-2">Key Technical Skills</h3>
              <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Top programming languages and frameworks with visual bar charts and percentage breakdowns.</p>
            </div>
            <div class="glass-card p-6 sm:p-7 group animate-fade-up" style="animation-delay: 160ms;">
              <div class="w-12 h-12 rounded-xl bg-teal-600/10 dark:bg-teal-500/10 flex items-center justify-center mb-5 transition-transform duration-300 ease-smooth group-hover:scale-110">
                <svg class="w-6 h-6 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
              </div>
              <h3 class="text-h4 text-slate-900 dark:text-slate-50 mb-2">Notable Projects</h3>
              <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Highlighted repositories with star counts, descriptions, and primary language identification.</p>
            </div>
            <div class="glass-card p-6 sm:p-7 group animate-fade-up" style="animation-delay: 240ms;">
              <div class="w-12 h-12 rounded-xl bg-teal-600/10 dark:bg-teal-500/10 flex items-center justify-center mb-5 transition-transform duration-300 ease-smooth group-hover:scale-110">
                <svg class="w-6 h-6 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
              </div>
              <h3 class="text-h4 text-slate-900 dark:text-slate-50 mb-2">Developer Archetype</h3>
              <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">AI-categorized developer type - from "The Foundational Architect" to "The Community Builder."</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Social Proof Section -->
      <section class="py-12 sm:py-16 px-6 md:px-12">
        <div class="max-w-[1200px] mx-auto">
          <div class="backdrop-blur-lg bg-white/60 border border-white/20 rounded-2xl shadow-glass-1 dark:bg-black/45 dark:border-white/8 dark:shadow-glass-1-dark p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
            <a href="https://github.com/Ziqian-Huang0607/Profile-Pilot" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 group">
              <div class="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center transition-transform duration-200 ease-smooth group-hover:scale-110">
                <svg class="w-5 h-5 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              </div>
              <div><div class="text-xl font-semibold text-slate-800 dark:text-slate-100">4</div><div class="text-sm text-slate-500 dark:text-slate-400">GitHub Stars</div></div>
            </a>
            <div class="w-px h-10 bg-slate-200 dark:bg-white/10 hidden sm:block"></div>
            <div class="w-16 h-px bg-slate-200 dark:bg-white/10 sm:hidden"></div>
            <a href="https://github.com/Ziqian-Huang0607/Profile-Pilot" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 group">
              <div class="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-900/20 flex items-center justify-center transition-transform duration-200 ease-smooth group-hover:scale-110">
                <svg class="w-5 h-5 text-sky-600 dark:text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M7 3a2 2 0 012 2v5.59l-2.29 2.3a1 1 0 000 1.42l2.29 2.3V19a2 2 0 01-2 2 2 2 0 01-2-2V5a2 2 0 012-2zM17 21a2 2 0 01-2-2v-2.59l2.29-2.3a1 1 0 000-1.42l-2.29-2.3V5a2 2 0 012-2 2 2 0 012 2v14a2 2 0 01-2 2z"/></svg>
              </div>
              <div><div class="text-xl font-semibold text-slate-800 dark:text-slate-100">2</div><div class="text-sm text-slate-500 dark:text-slate-400">Forks</div></div>
            </a>
            <div class="w-px h-10 bg-slate-200 dark:bg-white/10 hidden sm:block"></div>
            <div class="w-16 h-px bg-slate-200 dark:bg-white/10 sm:hidden"></div>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-900/20 flex items-center justify-center">
                <svg class="w-5 h-5 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
              </div>
              <div><div class="text-xl font-semibold text-slate-800 dark:text-slate-100">Open Source</div><div class="text-sm text-slate-500 dark:text-slate-400">Free to use</div></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Report Section -->
      <section v-if="reportMarkdown" id="report-section" ref="reportSectionRef" class="py-16 sm:py-24 px-6 md:px-12 animate-fade-up">
        <div class="max-w-[1200px] mx-auto">
          <div class="glass-card p-6 sm:p-8 md:p-10">
            <div v-if="showActions" class="flex flex-wrap items-center gap-3 mb-6 pb-6 border-b border-black/5 dark:border-white/6">
              <button @click="copyToClipboard" class="inline-flex items-center gap-2 bg-white/40 border border-white/20 text-slate-700 font-medium rounded-xl px-5 py-2.5 backdrop-blur-sm transition-all duration-200 ease-spring dark:bg-white/5 dark:border-white/10 dark:text-slate-200 hover:bg-white/60 hover:border-white/35 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] dark:hover:bg-white/10 dark:hover:border-white/20 active:scale-[0.98]">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                <span>{{ copied ? t('copied') : t('copy') }}</span>
              </button>
              <button @click="downloadMarkdown" class="inline-flex items-center gap-2 bg-white/40 border border-white/20 text-slate-700 font-medium rounded-xl px-5 py-2.5 backdrop-blur-sm transition-all duration-200 ease-spring dark:bg-white/5 dark:border-white/10 dark:text-slate-200 hover:bg-white/60 hover:border-white/35 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] dark:hover:bg-white/10 dark:hover:border-white/20 active:scale-[0.98]">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                <span>{{ t('download') }}</span>
              </button>
            </div>
            <div class="prose dark:prose-invert max-w-none prose-headings:text-slate-900 dark:prose-headings:text-slate-50 prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-strong:text-slate-800 dark:prose-strong:text-slate-200 prose-a:text-teal-600 dark:prose-a:text-teal-400 prose-code:text-pink-600 dark:prose-code:text-pink-400 prose-pre:bg-slate-100 dark:prose-pre:bg-slate-900 prose-pre:text-slate-800 dark:prose-pre:text-slate-200 prose-blockquote:border-teal-500 dark:prose-blockquote:border-teal-400 prose-blockquote:text-slate-600 dark:prose-blockquote:text-slate-400" v-html="renderedReport"></div>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';
import BackgroundLayer from './components/BackgroundLayer.vue';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import MarkdownIt from 'markdown-it';

const { locale, t } = useI18n();

const username = ref('');
const loading = ref(false);
const reportMarkdown = ref('');
const errorMessage = ref('');
const errorTitle = ref('');
const showActions = ref(false);
const currentStep = ref(0);
const downloadFilename = ref('');
const copied = ref(false);
const reportSectionRef = ref(null);

const md = new MarkdownIt({ html: true, linkify: true, typographer: true });

const renderedReport = computed(() => {
  if (!reportMarkdown.value) return '';
  return md.render(reportMarkdown.value);
});

const steps = computed(() => {
  const isEs = locale.value === 'es';
  return [
    { label: isEs ? 'Obteniendo perfil...' : 'Fetching profile...', active: currentStep.value === 0, completed: currentStep.value > 0, pending: currentStep.value < 0 },
    { label: isEs ? 'Analizando repos...' : 'Analyzing repos...', active: currentStep.value === 1, completed: currentStep.value > 1, pending: currentStep.value < 1 },
    { label: isEs ? 'Generando informe IA...' : 'Generating AI report...', active: currentStep.value === 2, completed: currentStep.value > 2, pending: currentStep.value < 2 },
    { label: isEs ? 'Construyendo panel...' : 'Building dashboard...', active: currentStep.value === 3, completed: currentStep.value > 3, pending: currentStep.value < 3 },
  ];
});

const currentStepDescription = computed(() => {
  const isEs = locale.value === 'es';
  const descriptions = isEs
    ? ['Recuperando datos del perfil de GitHub...', 'Analizando repositorios y lenguajes...', 'Generando informe con Google Gemini AI...', 'Preparando el panel de resultados...']
    : ['Fetching GitHub profile data...', 'Analyzing repositories and languages...', 'Generating report with Google Gemini AI...', 'Preparing the results dashboard...'];
  return descriptions[currentStep.value] || '';
});

const progressPercent = computed(() => ((currentStep.value + 1) / 4) * 100);

async function handleAnalyze() {
  if (!username.value.trim() || loading.value) return;
  await analyzeUsername(username.value.trim());
}

async function analyzeUsername(name) {
  loading.value = true;
  reportMarkdown.value = '';
  errorMessage.value = '';
  errorTitle.value = '';
  showActions.value = false;
  downloadFilename.value = name;
  currentStep.value = 0;
  const stepTimers = [];

  try {
    currentStep.value = 0;
    stepTimers.push(setTimeout(() => { currentStep.value = 1; }, 800));
    stepTimers.push(setTimeout(() => { currentStep.value = 2; }, 2000));
    stepTimers.push(setTimeout(() => { currentStep.value = 3; }, 3500));

    const lang = locale.value;
    const response = await fetch(`https://p01--profile-pilot--d4v66vmd5jt6.code.run/index?username=${encodeURIComponent(name)}&lang=${lang}`);
    stepTimers.forEach(clearTimeout);

    if (!response.ok) {
      let errorMsg = locale.value === 'es' ? 'Error del servidor' : 'Server error';
      try { const errData = await response.json(); errorMsg = errData.error || errorMsg; } catch {}
      throw new Error(errorMsg);
    }

    const data = await response.json();
    if (!data.report_md) {
      throw new Error(locale.value === 'es' ? 'La respuesta no contiene datos del informe' : 'Response does not contain report data');
    }

    reportMarkdown.value = data.report_md;
    showActions.value = true;
    currentStep.value = 4;

    await nextTick();
    setTimeout(() => {
      const el = document.getElementById('report-section');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  } catch (err) {
    stepTimers.forEach(clearTimeout);
    const msg = err.message || (locale.value === 'es' ? 'Error desconocido' : 'Unknown error occurred');
    errorMessage.value = msg;
    const msgLower = msg.toLowerCase();
    if (msgLower.includes('not found') || msgLower.includes('no encontr')) {
      errorTitle.value = locale.value === 'es' ? 'Usuario no encontrado' : 'User not found';
      errorMessage.value = locale.value === 'es'
        ? 'No pudimos encontrar un usuario de GitHub con ese nombre. Por favor verifica la ortografia e intenta de nuevo.'
        : "We couldn't find a GitHub user with that username. Please check the spelling and try again.";
    } else if (msgLower.includes('private') || msgLower.includes('privado')) {
      errorTitle.value = locale.value === 'es' ? 'Perfil privado' : 'Profile is private';
      errorMessage.value = locale.value === 'es'
        ? 'Los datos de este usuario no son publicamente accesibles. Intenta con otro nombre de usuario.'
        : "This user's profile data is not publicly accessible. Try a different username.";
    } else if (msgLower.includes('rate') || msgLower.includes('limite')) {
      errorTitle.value = locale.value === 'es' ? 'Limite alcanzado' : 'Rate limit reached';
      errorMessage.value = locale.value === 'es'
        ? 'Hemos alcanzado el limite de la API de GitHub. Por favor espera unos minutos e intenta de nuevo.'
        : "We've hit GitHub's API rate limit. Please wait a few minutes and try again.";
    } else if (msgLower.includes('network') || msgLower.includes('connection') || msgLower.includes('conexion')) {
      errorTitle.value = locale.value === 'es' ? 'Error de conexion' : 'Connection error';
      errorMessage.value = locale.value === 'es'
        ? 'No se pudo conectar. Por favor verifica tu conexion a internet e intenta de nuevo.'
        : 'Unable to connect. Please check your internet connection and try again.';
    } else {
      errorTitle.value = locale.value === 'es' ? 'Algo salio mal' : 'Something went wrong';
    }
    currentStep.value = 0;
  } finally {
    loading.value = false;
  }
}

function clearError() {
  errorMessage.value = '';
  errorTitle.value = '';
}

async function copyToClipboard() {
  if (!reportMarkdown.value) return;
  try {
    await navigator.clipboard.writeText(reportMarkdown.value);
    copied.value = true;
    setTimeout(() => { copied.value = false; }, 2000);
  } catch {
    const textarea = document.createElement('textarea');
    textarea.value = reportMarkdown.value;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      copied.value = true;
      setTimeout(() => { copied.value = false; }, 2000);
    } catch {}
    document.body.removeChild(textarea);
  }
}

function downloadMarkdown() {
  if (!reportMarkdown.value) return;
  const blob = new Blob([reportMarkdown.value], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${downloadFilename.value || 'report'}-profile-pilot.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
</script>
