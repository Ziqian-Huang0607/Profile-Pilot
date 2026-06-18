import { ref, onMounted } from 'vue';

const STORAGE_KEY = 'profile-pilot-theme';

export function useTheme() {
  const isDark = ref(false);

  function applyTheme() {
    const html = document.documentElement;
    if (isDark.value) { html.classList.add('dark'); } else { html.classList.remove('dark'); }
  }

  function toggle() {
    isDark.value = !isDark.value;
    applyTheme();
    try { localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light'); } catch { /* ignore */ }
  }

  function init() {
    let theme = null;
    try { theme = localStorage.getItem(STORAGE_KEY); } catch { /* ignore */ }
    if (theme === 'dark') { isDark.value = true; }
    else if (theme === 'light') { isDark.value = false; }
    else { isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches; }
    applyTheme();
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => {
      try { if (!localStorage.getItem(STORAGE_KEY)) { isDark.value = e.matches; applyTheme(); } } catch { /* ignore */ }
    };
    if (mq.addEventListener) mq.addEventListener('change', handler);
    else if (mq.addListener) mq.addListener(handler);
  }

  onMounted(() => { init(); });
  return { isDark, toggle, init };
}
