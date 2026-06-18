export const languageColors = {
  JavaScript: '#0d9488', TypeScript: '#0ea5e9', Python: '#0ea5e9',
  CSS: '#8b5cf6', HTML: '#f59e0b', Shell: '#ec4899',
  Go: '#10b981', Rust: '#10b981', Java: '#6366f1',
  'C++': '#6366f1', C: '#f59e0b', PHP: '#8b5cf6',
  Ruby: '#ec4899', Swift: '#f59e0b', Kotlin: '#6366f1',
  SCSS: '#8b5cf6', Sass: '#8b5cf6', Less: '#8b5cf6',
  'Objective-C': '#6366f1', Scala: '#6366f1', Dart: '#0ea5e9',
  Julia: '#6366f1', R: '#6366f1', MATLAB: '#6366f1',
  Perl: '#0ea5e9', Lua: '#0ea5e9', Haskell: '#6366f1',
  Elixir: '#8b5cf6', Clojure: '#10b981', Erlang: '#ec4899',
  OCaml: '#f59e0b', VimScript: '#10b981', Dockerfile: '#ec4899',
  Makefile: '#ec4899', Other: '#6b7280',
};

export function getLanguageColor(name) {
  if (!name || typeof name !== 'string') return languageColors.Other;
  const normalized = name.trim();
  if (languageColors[normalized]) return languageColors[normalized];
  const lower = normalized.toLowerCase();
  const match = Object.keys(languageColors).find((k) => k.toLowerCase() === lower);
  return match ? languageColors[match] : languageColors.Other;
}

export function getChartColorByIndex(index) {
  return ['#0d9488', '#0ea5e9', '#8b5cf6', '#f59e0b', '#ec4899', '#10b981', '#6366f1', '#6b7280'][index % 8];
}
