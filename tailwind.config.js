/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        altyn: {
          DEFAULT: '#854F0B',
          light: '#EF9F27',
          pale: '#FAEEDA',
          dark: '#633806',
          deep: '#412402',
        },
        background: {
          primary: '#0A0A0A',
          secondary: '#1A1A1A',
          tertiary: '#2A2A2A',
        },
        border: {
          DEFAULT: '#333333',
          gold: 'rgba(133, 79, 11, 0.3)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #854F0B 0%, #EF9F27 100%)',
        'dark-gradient': 'radial-gradient(circle at top center, #1A1A1A 0%, #0A0A0A 100%)',
      },
      boxShadow: {
        'gold-glow': '0 0 20px rgba(133, 79, 11, 0.2)',
      }
    },
  },
  plugins: [],
}
