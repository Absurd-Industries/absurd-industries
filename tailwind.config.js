/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,htm,js}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'main': ['Jura', 'monospace'],
      },
      colors: {
        // Light theme colors
        'cream': {
          50: '#faf8f5',
          100: '#f5f1ea',
          200: '#ece0cf', // --bg-primary light
          300: '#e0d4c3', // --bg-tertiary light
          400: '#d1c4b3', // --border-color light
          500: '#b8a690',
          600: '#a08971',
          700: '#8b7159',
          800: '#725d4a',
          900: '#5d4c3e',
        },
        'dark-bg': {
          primary: '#1a1a1a',   // --bg-primary dark
          secondary: '#2a2a2a', // --bg-secondary dark
          tertiary: '#111111',  // --bg-tertiary dark
          border: '#3a3a3a',    // --border-color dark
        },
        'text': {
          primary: '#1a1a1a',     // --text-primary light
          secondary: '#5c5c5c',   // --text-secondary light
          'dark-primary': '#ece0cf',   // --text-primary dark
          'dark-secondary': '#9ca3af', // --text-secondary dark
        },
        'accent': {
          orange: '#ff4500',
          yellow: '#ffd700',
        }
      },
      backgroundColor: {
        'primary': 'var(--bg-primary)',
        'secondary': 'var(--bg-secondary)',
        'tertiary': 'var(--bg-tertiary)',
      },
      textColor: {
        'primary': 'var(--text-primary)',
        'secondary': 'var(--text-secondary)',
        'on-accent': 'var(--text-on-accent)',
      },
      borderColor: {
        'theme': 'var(--border-color)',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' }
        }
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
      }
    },
  },
  plugins: [
    function({ addComponents, theme }) {
      addComponents({
        '.skeleton': {
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: 'var(--bg-tertiary)',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            transform: 'translateX(-100%)',
            backgroundImage: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.05) 20%, rgba(255, 255, 255, 0.1) 60%, rgba(255, 255, 255, 0))',
            animation: 'shimmer 2s infinite',
          }
        }
      })
    }
  ],
}