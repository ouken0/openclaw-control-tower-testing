/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Moroccan-inspired palette
        'deep-blue': '#1a365d',
        'royal-blue': '#2c5282',
        'terracotta': '#c05621',
        'gold': '#d69e2e',
        'sand': '#f5f0e6',
        // Federation status colors
        'fed-active': '#38a169',
        'fed-idle': '#d69e2e',
        'fed-error': '#e53e3e',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['Noto Sans Arabic', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
