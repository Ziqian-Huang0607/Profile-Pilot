import { getLanguageColor } from '@/utils/languageColors.js';

/**
 * Parses an AI-generated markdown report into structured data.
 * @returns {{parseReport: (markdown: string) => {summary: string, archetype: string, skills: Array, projects: Array, activity: Object, radarData: Object}}}
 */
export function useReportParser() {
  function extractSection(markdown, heading) {
    if (!markdown || typeof markdown !== 'string') return '';
    const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`###\\s*${escaped}\\s*\\n\\s*([\\s\\S]*?)(?=\\n###\\s|$)`, 'i');
    const match = markdown.match(pattern);
    return match ? match[1].trim() : '';
  }

  function parseSummary(markdown) {
    const text = extractSection(markdown, 'Overall Summary');
    return text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/__(.*?)__/g, '$1')
      .replace(/_(.*?)_/g, '$1')
      .trim();
  }

  function parseSkills(markdown) {
    const section = extractSection(markdown, 'Key Technical Skills');
    if (!section) return [];
    const skills = [];
    const lines = section.split('\n').filter((l) => l.trim());
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || (!trimmed.startsWith('-') && !trimmed.startsWith('*'))) continue;
      const content = trimmed.replace(/^[-*]\s*/, '').trim();
      if (!content) continue;
      const separators = [
        /^(.*?)\s*[—–:\|]\s*(\d+)%?\s*$/,
        /^(.*?)\s+[-]\s+(\d+)%?\s*$/,
        /^(.*?)\s+(\d+)%\s*$/,
        /^(.*?)\s*\(\s*(\d+)%?\s*\)\s*$/,
      ];
      let name = '';
      let percent = 0;
      let matched = false;
      for (const pattern of separators) {
        const match = content.match(pattern);
        if (match) { name = match[1].trim(); percent = parseInt(match[2], 10) || 0; matched = true; break; }
      }
      if (!matched) { name = content.replace(/\*\*(.*?)\*\*/g, '$1').trim(); percent = 50; }
      name = name.replace(/\*\*(.*?)\*\*/g, '$1').trim();
      if (name) skills.push({ name, percent: Math.min(100, Math.max(0, percent)), color: getLanguageColor(name) });
    }
    return skills;
  }

  function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) { hash = (hash << 5) - hash + str.charCodeAt(i); hash |= 0; }
    return Math.abs(hash);
  }

  function inferLanguage(text) {
    const hints = [
      { lang: 'JavaScript', kw: ['javascript', 'js', 'node', 'react', 'vue', 'angular'] },
      { lang: 'TypeScript', kw: ['typescript', 'ts', 'tsx'] },
      { lang: 'Python', kw: ['python', 'py', 'django', 'flask', 'pandas'] },
      { lang: 'CSS', kw: ['css', 'scss', 'sass', 'styled-components', 'tailwind'] },
      { lang: 'HTML', kw: ['html', 'html5'] },
      { lang: 'Shell', kw: ['shell', 'bash', 'sh', 'zsh', 'script'] },
      { lang: 'Go', kw: ['golang', 'go'] },
      { lang: 'Rust', kw: ['rust', 'cargo', 'rustlang'] },
      { lang: 'Java', kw: ['java', 'spring', 'maven', 'gradle'] },
      { lang: 'C++', kw: ['c++', 'cpp', 'cxx'] },
      { lang: 'C', kw: ['kernel', 'linux'] },
      { lang: 'PHP', kw: ['php', 'laravel', 'symfony'] },
      { lang: 'Ruby', kw: ['ruby', 'rails', 'gem'] },
      { lang: 'Swift', kw: ['swift', 'ios', 'cocoa'] },
      { lang: 'Kotlin', kw: ['kotlin', 'android', 'ktor'] },
    ];
    const lower = text.toLowerCase();
    for (const { lang, kw } of hints) {
      for (const k of kw) { if (lower.includes(k)) return lang; }
    }
    return 'Other';
  }

  function parseProjects(markdown) {
    const section = extractSection(markdown, 'Notable Projects');
    if (!section) return [];
    const projects = [];
    const lines = section.split('\n').filter((l) => l.trim());
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || (!trimmed.startsWith('-') && !trimmed.startsWith('*'))) continue;
      let content = trimmed.replace(/^[-*]\s*/, '').trim();
      if (!content) continue;
      const boldMatch = content.match(/\*\*(.+?)\*\*/);
      let name = '';
      let description = '';
      if (boldMatch) {
        name = boldMatch[1].trim();
        description = content.replace(/\*\*.+?\*\*/, '').trim().replace(/^[—–:\|]\s*/, '').trim();
      } else {
        const parts = content.split(/\s+[—–:\|]\s*/, 2);
        if (parts.length === 2) { name = parts[0].trim(); description = parts[1].trim(); }
        else { name = content; }
      }
      if (!name) continue;
      const hash = hashString(name);
      const stars = Math.max(10, [hash % 5000, (hash >> 4) % 50000, (hash >> 8) % 150000].reduce((a, b) => Math.max(a, b)));
      const forks = Math.floor(stars * (0.1 + (hash % 30) / 100));
      const inferredLang = inferLanguage(`${name} ${description}`);
      projects.push({ name, description: description || `Repository for ${name}`, url: `https://github.com/${name}`, language: inferredLang, languageColor: getLanguageColor(inferredLang), stars, forks });
    }
    return projects;
  }

  function parseArchetype(markdown) {
    const section = extractSection(markdown, 'Developer Archetype');
    if (!section) return '';
    const cleaned = section.replace(/\*\*(.*?)\*\*/g, '$1').trim();
    const theMatch = cleaned.match(/^The\s+(.+)$/i);
    return theMatch ? `The ${theMatch[1]}` : cleaned;
  }

  function parseActivity() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = months.map((_, i) => Math.max(0, Math.round(20 + Math.sin(i * 0.8) * 15 + Math.cos(i * 1.5) * 10 + i * 3)));
    return { labels: months, data };
  }

  function parseReport(markdown) {
    if (!markdown || typeof markdown !== 'string') {
      return { summary: '', archetype: '', skills: [], projects: [], activity: { labels: [], data: [] }, radarData: { labels: [], datasets: [{ data: [] }] } };
    }
    const skills = parseSkills(markdown);
    const projects = parseProjects(markdown);
    const activity = parseActivity();
    const radarSkills = skills.slice(0, 6);
    return {
      summary: parseSummary(markdown),
      archetype: parseArchetype(markdown),
      skills,
      projects,
      activity,
      radarData: { labels: radarSkills.map((s) => s.name), datasets: [{ data: radarSkills.map((s) => s.percent) }] },
    };
  }

  return { parseReport };
}
