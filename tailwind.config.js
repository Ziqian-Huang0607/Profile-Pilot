/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        // Teal accent family mapped explicitly
        accent: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
      },
      boxShadow: {
        'glass-1': '0 8px 32px rgba(0, 0, 0, 0.08)',
        'glass-2': '0 12px 48px rgba(0, 0, 0, 0.12)',
        'glass-hover': '0 16px 56px rgba(0, 0, 0, 0.14)',
        'glass-1-dark': '0 8px 32px rgba(0, 0, 0, 0.30)',
        'glass-2-dark': '0 12px 48px rgba(0, 0, 0, 0.40)',
        'glass-hover-dark': '0 16px 56px rgba(0, 0, 0, 0.50)',
        'glass-subtle': '0 4px 16px rgba(0, 0, 0, 0.04)',
        'glass-subtle-dark': '0 4px 16px rgba(0, 0, 0, 0.20)',
        'input': '0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
        'input-dark': '0 8px 32px rgba(0, 0, 0, 0.35), 0 2px 8px rgba(0, 0, 0, 0.15)',
        'nav': '0 8px 32px rgba(0, 0, 0, 0.08)',
        'nav-dark': '0 8px 32px rgba(0, 0, 0, 0.35)',
        'btn-primary': '0 4px 20px rgba(13, 148, 136, 0.30)',
        'btn-primary-sm': '0 4px 16px rgba(13, 148, 136, 0.25)',
        'toast': '0 8px 32px rgba(0, 0, 0, 0.15)',
        'error': '0 4px 16px rgba(220, 38, 38, 0.06)',
        'logo': '0 2px 8px rgba(13, 148, 136, 0.25)',
      },
      borderRadius: {
        'card': '16px',
        'card-sm': '12px',
        'card-lg': '20px',
        'btn': '12px',
        'nav': '16px',
        'input': '12px',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'dramatic': 'cubic-bezier(0.87, 0, 0.13, 1)',
        'default-bezier': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '250': '250ms',
        '400': '400ms',
      },
      keyframes: {
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        fadeUp: {
          from: {
            opacity: '0',
            transform: 'translateY(24px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeUpScale: {
          from: {
            opacity: '0',
            transform: 'translateY(20px) scale(0.98)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0) scale(1)',
          },
        },
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(13, 148, 136, 0.2)' },
          '50%': { boxShadow: '0 0 0 6px rgba(13, 148, 136, 0)' },
        },
        slideInRight: {
          from: {
            opacity: '0',
            transform: 'translateX(30px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        progressFill: {
          from: { width: '0%' },
          to: { width: 'var(--progress-width)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        borderShimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        scaleIn: {
          from: {
            opacity: '0',
            transform: 'scale(0.95)',
          },
          to: {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        gentleSpin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'gradient-shift': 'gradientShift 20s ease infinite',
        'fade-up': 'fadeUp 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
        'fade-up-scale': 'fadeUpScale 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
        'shimmer': 'shimmer 1.8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'slide-in-right': 'slideInRight 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
        'progress-fill': 'progressFill 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
        'float': 'float 12s ease-in-out infinite',
        'border-shimmer': 'borderShimmer 4s ease infinite',
        'fade-in': 'fadeIn 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
        'scale-in': 'scaleIn 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
        'gentle-spin': 'gentleSpin 1.2s linear infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
