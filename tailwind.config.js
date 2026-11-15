/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        geo: {
          bg: '#0b0f19',
          surface: '#111827',
          panel: '#151d2e',
          card: '#1b253b',
          border: '#27354f',
          borderLight: '#374768',
          text: '#f1f5f9',
          muted: '#94a3b8',
          accent: '#14b8a6', // Teal
          accentHover: '#0d9488',
          secondary: '#38bdf8', // Cyan
          warning: '#f59e0b', // Amber (predictions)
          danger: '#ef4444',
          success: '#10b981',
          observed: '#38bdf8',
          forecast: '#f59e0b',
          synthetic: '#a855f7'
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Menlo', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

