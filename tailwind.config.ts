// tailwind.config.js
export default {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Georgia', 'serif'],
        mono: ['Courier New', 'monospace'],
      },
      colors: {
        gold: {
          400: '#FFD700',
          500: '#FFB700',
          600: '#FFA500',
        },
        background: {
          light: '#f9f9f9',
          dark: '#0f0f0f',
        },
      },
      boxShadow: {
        'gold-glow': '0 0 8px 2px rgba(255, 215, 0, 0.4)',
      },
      backgroundImage: {
        'metallic-gold': 'linear-gradient(90deg, #FFD700, #FFB700, #FFD700)',
      },
      transitionProperty: {
        'max-height': 'max-height',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
