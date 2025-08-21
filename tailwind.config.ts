// tailwind.config.js
export default {
  darkMode: false,
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: '#FFD700',
        dark: '#0f0f0f',
      },
    },
  },
  plugins: [],
}
