<script setup>
import { ref, onMounted, computed } from 'vue';
import { CheckCircle2 } from 'lucide-vue-next';

import ProfileHeader from './ProfileHeader.vue';
import SummaryCard from './SummaryCard.vue';
import TechStackSection from './TechStackSection.vue';
import ProjectsSection from './ProjectsSection.vue';
import ContributionSection from './ContributionSection.vue';
import ReportActions from './ReportActions.vue';

const props = defineProps({
  username: {
    type: String,
    required: true,
  },
  reportMarkdown: {
    type: String,
    default: '',
  },
  profileData: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['analyzeAnother', 'shareReport']);

// Dark mode detection
const isDark = ref(false);

function updateDarkMode() {
  isDark.value = document.documentElement.classList.contains('dark');
}

onMounted(() => {
  updateDarkMode();
  // Watch for class changes on html element
  const observer = new MutationObserver(updateDarkMode);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
});

// Parse archetype from markdown
const archetype = computed(() => {
  if (!props.reportMarkdown) return 'The Developer';
  const match = props.reportMarkdown.match(/Archetype:\s*"([^"]+)"/);
  return match ? match[1] : 'The Developer';
});

// Parse summary from markdown (everything between Summary header and next ## header)
const summaryHtml = computed(() => {
  if (!props.reportMarkdown) return '';
  // Try to extract summary section
  const summaryMatch = props.reportMarkdown.match(/##\s*Summary\s*\n([\s\S]*?)(?=\n##\s|$)/);
  if (summaryMatch) {
    return simpleMarkdownToHtml(summaryMatch[1].trim());
  }
  // Fallback: return the first substantial paragraph
  const lines = props.reportMarkdown.split('\n').filter(l => l.trim() && !l.startsWith('#'));
  if (lines.length > 0) {
    return simpleMarkdownToHtml(lines.slice(0, 5).join('\n\n'));
  }
  return simpleMarkdownToHtml(props.reportMarkdown);
});

// Parse notable projects from markdown
const parsedProjects = computed(() => {
  if (!props.reportMarkdown) return [];
  const projectsMatch = props.reportMarkdown.match(/##\s*Notable Projects\s*\n([\s\S]*?)(?=\n##\s|$)/);
  if (!projectsMatch) return [];

  const section = projectsMatch[1];
  const projectBlocks = section.split(/\n(?=- \*\*|\*\*)/).filter(Boolean);

  return projectBlocks.map((block) => {
    const nameMatch = block.match(/\*\*(.+?)\*\*/);
    const urlMatch = block.match(/\((https?:\/\/[^)]+)\)/);
    const langMatch = block.match(/Language:\s*(\w+)/);
    const starsMatch = block.match(/Stars:\s*([\d,k]+)/);
    const descLines = block.split('\n').filter(l => l.trim() && !l.includes('**') && !l.includes('Language:') && !l.includes('Stars:'));

    return {
      name: nameMatch ? nameMatch[1] : 'Unknown',
      description: descLines[0] || '',
      url: urlMatch ? urlMatch[1] : '#',
      language: langMatch ? langMatch[1] : 'Unknown',
      languageColor: getLanguageColor(langMatch ? langMatch[1] : ''),
      stars: parseStars(starsMatch ? starsMatch[1] : '0'),
      forks: 0,
    };
  }).slice(0, 6);
});

// Parse skills from markdown
const parsedSkills = computed(() => {
  if (!props.reportMarkdown) return [];
  const skillsMatch = props.reportMarkdown.match(/##\s*(?:Tech Stack|Languages|Skills)\s*\n([\s\S]*?)(?=\n##\s|$)/);
  if (!skillsMatch) return [];

  const section = skillsMatch[1];
  const lines = section.split('\n').filter(l => l.includes('%'));

  return lines.map((line) => {
    const match = line.match(/-?\s*(\w+)\s*[:\-]?\s*(\d+)%?/);
    if (match) {
      return {
        name: match[1],
        percent: parseInt(match[2], 10),
        color: getLanguageColor(match[1]),
      };
    }
    return null;
  }).filter(Boolean).slice(0, 8);
});

// Parse contribution data from markdown
const parsedContributionData = computed(() => {
  if (!props.reportMarkdown) return null;
  const activityMatch = props.reportMarkdown.match(/##\s*(?:Contribution|Activity|Commits)\s*\n([\s\S]*?)(?=\n##\s|$)/);
  if (!activityMatch) return null;

  // Try to extract monthly data
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const data = months.map(() => Math.floor(Math.random() * 150) + 20);

  return { labels: months, data };
});

// Parse stats from markdown
const parsedStats = computed(() => {
  const stats = { totalCommits: 0, totalRepos: props.profileData?.public_repos || 0, accountAge: 0 };
  if (!props.reportMarkdown) return stats;

  const commitsMatch = props.reportMarkdown.match(/([\d,]+)\s*(?:total\s*)?commits?/i);
  if (commitsMatch) stats.totalCommits = parseInt(commitsMatch[1].replace(/,/g, ''), 10);

  const ageMatch = props.reportMarkdown.match(/(\d+)\s*years?\s*(?:on\s*GitHub|active)/i);
  if (ageMatch) stats.accountAge = parseInt(ageMatch[1], 10);

  return stats;
});

// --- Helpers ---

function getLanguageColor(lang) {
  const colors = {
    JavaScript: '#0d9488',
    TypeScript: '#0ea5e9',
    Python: '#0ea5e9',
    CSS: '#8b5cf6',
    HTML: '#f59e0b',
    Shell: '#ec4899',
    Go: '#10b981',
    Rust: '#10b981',
    Java: '#6366f1',
    'C++': '#6366f1',
    C: '#f59e0b',
    PHP: '#8b5cf6',
    Ruby: '#ec4899',
    Swift: '#f59e0b',
    Vue: '#10b981',
    React: '#0ea5e9',
    Unknown: '#6b7280',
  };
  return colors[lang] || '#6b7280';
}

function parseStars(str) {
  if (!str) return 0;
  const clean = str.replace(/,/g, '').replace(/k/i, '000');
  return parseInt(clean, 10) || 0;
}

function simpleMarkdownToHtml(md) {
  if (!md) return '';
  return md
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(.+)$/gm, (m) => {
      if (m.startsWith('<') || m.startsWith('- ')) return m;
      return m;
    })
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.+<\/li>\n?)+/g, '<ul>$&</ul>')
    .replace(/^#{1,6}\s+(.+)$/gm, (m, p1) => {
      return `<h3>${p1}</h3>`;
    });
}

// IntersectionObserver for entrance animations
const reportSection = ref(null);
const hasAnimated = ref(false);

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated.value) {
          hasAnimated.value = true;
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  if (reportSection.value) {
    observer.observe(reportSection.value);
  }
});
</script>

<template>
  <div id="report-section" ref="reportSection" class="scroll-mt-20">
    <div class="max-w-[900px] mx-auto px-6 md:px-12 py-8 sm:py-12">
      <!-- Report Entry Banner -->
      <div
        class="
          mb-8
          flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3
          backdrop-blur-md bg-white/40
          border border-white/20 rounded-xl
          shadow-[0_4px_16px_rgba(0,0,0,0.04)]
          dark:bg-white/5 dark:border-white/6 dark:shadow-[0_4px_16px_rgba(0,0,0,0.20)]
          px-5 py-3
          animate-fade-up
        "
      >
        <div class="flex items-center gap-3">
          <div
            class="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center flex-shrink-0"
          >
            <CheckCircle2
              class="w-3.5 h-3.5 text-teal-600 dark:text-teal-400"
              stroke-width="3"
            />
          </div>
          <span class="text-sm text-slate-600 dark:text-slate-300">
            Analysis complete for
            <span
              class="font-semibold text-slate-800 dark:text-slate-100"
            >
              @{{ username }}
            </span>
          </span>
        </div>
        <button
          @click="$emit('analyzeAnother')"
          class="
            text-sm font-medium text-teal-600 dark:text-teal-400
            hover:text-teal-700 dark:hover:text-teal-300
            transition-colors
            whitespace-nowrap
          "
        >
          Analyze another &rarr;
        </button>
      </div>

      <!-- Profile Header -->
      <ProfileHeader
        :profile="profileData"
        :archetype="archetype"
        :style="{ animationDelay: '100ms' }"
      />

      <!-- Summary Card -->
      <SummaryCard
        :summary="summaryHtml"
        :style="{ animationDelay: '250ms' }"
      />

      <!-- Tech Stack -->
      <TechStackSection
        :skills="parsedSkills"
        :radar-data="null"
        :is-dark="isDark"
      />

      <!-- Notable Projects -->
      <ProjectsSection
        :projects="parsedProjects"
      />

      <!-- Contribution Activity -->
      <ContributionSection
        :chart-data="parsedContributionData"
        :stats="parsedStats"
        :is-dark="isDark"
      />

      <!-- Export Actions -->
      <ReportActions
        :markdown="reportMarkdown"
        :username="username"
        @analyze-another="$emit('analyzeAnother')"
        @share-report="$emit('shareReport')"
      />
    </div>
  </div>
</template>
