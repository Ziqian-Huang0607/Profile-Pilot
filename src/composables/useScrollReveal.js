import { onUnmounted } from 'vue';

export function useScrollReveal() {
  let observer = null;
  const REVEALED_CLASS = 'revealed';
  const REVEAL_TARGET_CLASS = 'reveal-target';
  const defaultOptions = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };

  function observe(selector = `.${REVEAL_TARGET_CLASS}`, options = {}, revealClass = REVEALED_CLASS) {
    disconnect();
    const merged = { ...defaultOptions, ...options };
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.dataset.revealDelay;
          if (delay) el.style.transitionDelay = delay;
          el.classList.add(revealClass);
          observer.unobserve(el);
        }
      });
    }, merged);
    document.querySelectorAll(selector).forEach((el) => observer.observe(el));
  }

  function disconnect() {
    if (observer) { observer.disconnect(); observer = null; }
  }

  onUnmounted(() => { disconnect(); });
  return { observe, disconnect };
}

export function setupScrollReveal(container, selector = '.reveal-target', options = {}) {
  const merged = { threshold: 0.15, rootMargin: '0px 0px -40px 0px', ...options };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.revealDelay;
        if (delay) el.style.transitionDelay = delay;
        el.classList.add('revealed');
        observer.unobserve(el);
      }
    });
  }, merged);
  container.querySelectorAll(selector).forEach((el) => observer.observe(el));
  return () => observer.disconnect();
}
