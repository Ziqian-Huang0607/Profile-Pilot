export function getRadarChartOptions(isDark = false) {
  const textColor = isDark ? '#94a3b8' : '#64748b';
  const gridColor = isDark ? 'rgba(148,163,184,0.12)' : 'rgba(148,163,184,0.15)';
  const angleLineColor = isDark ? 'rgba(148,163,184,0.08)' : 'rgba(148,163,184,0.1)';
  return {
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: isDark ? 'rgba(15,23,42,0.95)' : 'rgba(255,255,255,0.95)',
        titleColor: isDark ? '#f8fafc' : '#0f172a',
        bodyColor: isDark ? '#e2e8f0' : '#334155',
        titleFont: { family: "'Inter',system-ui,-apple-system,sans-serif", size: 13, weight: '600' },
        bodyFont: { family: "'Inter',system-ui,-apple-system,sans-serif", size: 12 },
        padding: { top: 10, bottom: 10, left: 12, right: 12 },
        cornerRadius: 8, displayColors: false,
        borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)', borderWidth: 1,
        callbacks: { label: (ctx) => `${ctx.raw}%` },
      },
    },
    scales: {
      r: {
        beginAtZero: true, max: 100,
        ticks: { display: false, stepSize: 20, backdropColor: 'transparent' },
        grid: { color: gridColor, circular: true },
        angleLines: { color: angleLineColor },
        pointLabels: { font: { family: "'Inter',system-ui,-apple-system,sans-serif", size: 12, weight: '500' }, color: textColor, padding: 16 },
      },
    },
    elements: {
      line: { borderWidth: 2, borderColor: 'rgba(13,148,136,0.7)', backgroundColor: 'rgba(13,148,136,0.12)' },
      point: { radius: 4, hoverRadius: 6, backgroundColor: 'rgba(13,148,136,0.8)', borderColor: 'rgba(13,148,136,0.3)', borderWidth: 2 },
    },
    animation: { duration: 800, easing: 'easeOutQuart' },
  };
}

export function getBarChartOptions(isDark = false) {
  const tickColor = isDark ? '#64748b' : '#94a3b8';
  const xGridColor = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)';
  return {
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: isDark ? 'rgba(15,23,42,0.95)' : 'rgba(255,255,255,0.95)',
        titleColor: isDark ? '#f8fafc' : '#0f172a',
        bodyColor: isDark ? '#e2e8f0' : '#334155',
        titleFont: { family: "'Inter',system-ui,-apple-system,sans-serif", size: 12, weight: '600' },
        bodyFont: { family: "'Inter',system-ui,-apple-system,sans-serif", size: 12 },
        padding: { top: 10, bottom: 10, left: 12, right: 12 },
        cornerRadius: 8, displayColors: false,
        borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)', borderWidth: 1,
        callbacks: { label: (ctx) => `${ctx.raw} commits` },
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { font: { family: "'Inter',system-ui,-apple-system,sans-serif", size: 11 }, color: tickColor, maxRotation: 0 }, border: { display: false } },
      y: { beginAtZero: true, grid: { color: xGridColor, drawBorder: false }, ticks: { font: { family: "'Inter',system-ui,-apple-system,sans-serif", size: 11 }, color: tickColor, maxTicksLimit: 5, padding: 8 }, border: { display: false } },
    },
    elements: { bar: { borderRadius: 4, borderSkipped: false } },
    animation: { duration: 1000, easing: 'easeOutQuart', delay: (ctx) => (ctx.type === 'data' && ctx.mode === 'default' ? ctx.dataIndex * 80 : 0) },
  };
}

export function getRadarChartData(skills, isDark = false) {
  if (!skills || !skills.length) return { labels: [], datasets: [{ data: [], borderWidth: 2 }] };
  const s = skills.slice(0, 6);
  return {
    labels: s.map((x) => x.name),
    datasets: [{
      data: s.map((x) => x.percent),
      borderColor: 'rgba(13,148,136,0.7)',
      backgroundColor: isDark ? 'rgba(13,148,136,0.15)' : 'rgba(13,148,136,0.12)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(13,148,136,0.8)', pointBorderColor: 'rgba(13,148,136,0.3)',
      pointBorderWidth: 2, pointRadius: 4, pointHoverRadius: 6,
    }],
  };
}

export function getBarChartData(activity, isDark = false) {
  if (!activity || !activity.labels || !activity.data) return { labels: [], datasets: [{ data: [], borderRadius: 4 }] };
  return {
    labels: activity.labels,
    datasets: [{
      data: activity.data,
      backgroundColor: (ctx) => {
        const c = ctx.chart;
        const { ctx: canvasCtx, chartArea } = c;
        if (!chartArea) return isDark ? 'rgba(20,184,166,0.7)' : 'rgba(13,148,136,0.7)';
        const g = canvasCtx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        g.addColorStop(0, isDark ? 'rgba(20,184,166,0.7)' : 'rgba(13,148,136,0.7)');
        g.addColorStop(1, isDark ? 'rgba(20,184,166,0.2)' : 'rgba(13,148,136,0.2)');
        return g;
      },
      hoverBackgroundColor: isDark ? 'rgba(20,184,166,0.85)' : 'rgba(13,148,136,0.85)',
      borderRadius: 4, borderSkipped: false, barPercentage: 0.6, categoryPercentage: 0.8,
    }],
  };
}

export function getChartConfigs(isDark = false, skills = [], activity = null) {
  return {
    radarOptions: getRadarChartOptions(isDark), barOptions: getBarChartOptions(isDark),
    radarData: getRadarChartData(skills, isDark), barData: getBarChartData(activity, isDark),
  };
}
