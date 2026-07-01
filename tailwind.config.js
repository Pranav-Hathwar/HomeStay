/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0a0f0c',
        forest: '#10180f',
        moss: '#172217',
        card: '#141d14',
        fog: '#f2efe6',
        dim: 'rgba(242,239,230,.62)',
        faint: 'rgba(242,239,230,.4)',
        gold: '#c9a86a',
        'gold-bright': '#e3c98c',
        'gold-soft': 'rgba(201,168,106,.14)',
        line: 'rgba(242,239,230,.12)',
        'line-strong': 'rgba(242,239,230,.2)'
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['Inter', 'sans-serif']
      },
      borderRadius: {
        card: '24px',
        'card-lg': '32px',
        pill: '999px'
      },
      boxShadow: {
        glow: '0 18px 60px rgba(201,168,106,0.18)',
        'glow-sm': '0 10px 34px rgba(201,168,106,0.16)',
        hairline: 'inset 0 1px 0 rgba(242,239,230,0.06)'
      },
      backgroundImage: {
        'fog-grid': 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)'
      }
    }
  },
  plugins: []
};
