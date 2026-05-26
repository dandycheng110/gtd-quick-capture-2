/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#1a1a1a',
        paper: '#fafaf7',
        moss: '#3d5a40',
        mossLight: '#5b7d5e',
        rust: '#8b3a3a',
        slate: '#6b7280',
      },
      fontFamily: {
        sans: ['"Noto Sans TC"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
};
