export const theme = {
  colors: {
    bgDark: '#0f172a',
    bgCard: 'rgba(30, 41, 59, 0.7)',
    textMain: '#f8fafc',
    textMuted: '#94a3b8',
    accent: '#38bdf8',
    accentGlow: 'rgba(56, 189, 248, 0.5)',
    cost: '#fbbf24',
    glassBorder: 'rgba(255, 255, 255, 0.1)',
    painRed: '#dc2626',
    painGlow: 'rgba(220, 38, 38, 0.4)',
  },
  shadows: {
    glass: '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -2px rgba(0, 0, 0, 0.5)',
  },
  animations: {
    fadeIn: 'fadeIn 0.3s ease-out',
    slideDown: 'slideDown 0.3s ease-out',
  },
};

export type Theme = typeof theme;
