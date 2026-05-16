/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        altyn: {
          DEFAULT: '#B8860B',
          light: '#F0C850',
          pale: '#FFF4E0',
          dark: '#8B6508',
          deep: '#4B3604',
        },
        background: {
          primary: '#020203',
          secondary: '#0A0A0C',
          tertiary: '#121215',
        },
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.08)',
          gold: 'rgba(184, 134, 11, 0.3)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #B8860B 0%, #F0C850 50%, #B8860B 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
        'dark-gradient': 'radial-gradient(circle at top center, #0A0A0C 0%, #020203 100%)',
      },
      boxShadow: {
        'gold-glow': '0 0 30px rgba(184, 134, 11, 0.3)',
        'premium': '0 20px 40px rgba(0,0,0,0.4)',
      }
    },
  },
  plugins: [],
}
