/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  darkMode: 'class', // 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // 深色模式颜色
        dark: {
          bg: '#0f172a',
          card: 'rgba(255, 255, 255, 0.15)',
          text: '#ffffff',
          muted: 'rgba(255, 255, 255, 0.8)',
          input: {
            bg: 'rgba(255, 255, 255, 0.1)',
            border: 'rgba(255, 255, 255, 0.2)',
            focus: {
              border: 'rgba(129, 140, 248, 0.7)',
              bg: 'rgba(255, 255, 255, 0.15)',
              shadow: 'rgba(129, 140, 248, 0.3)',
            },
          },
          social: {
            bg: 'rgba(255, 255, 255, 0.05)',
            hover: 'rgba(255, 255, 255, 0.1)',
          },
          particles: {
            color: '#dbeafe',
            line: '#93c5fd',
          },
        },
        // 浅色模式颜色
        light: {
          bg: '#f1f5f9',
          card: 'rgba(255, 255, 255, 0.9)',
          text: '#1e293b',
          muted: 'rgba(51, 65, 85, 0.9)',
          input: {
            bg: 'rgba(255, 255, 255, 0.8)',
            border: 'rgba(203, 213, 225, 0.9)',
            focus: {
              border: 'rgba(99, 102, 241, 0.7)',
              bg: 'rgba(255, 255, 255, 1)',
              shadow: 'rgba(99, 102, 241, 0.3)',
            },
          },
          social: {
            bg: 'rgba(203, 213, 225, 0.3)',
            hover: 'rgba(203, 213, 225, 0.5)',
          },
          particles: {
            color: '#7dd3fc',
            line: '#3b82f6',
          },
        },
        primary: {
          light: '#0ea5e9', // sky-500
          DEFAULT: '#38bdf8', // sky-400
          dark: '#0284c7', // sky-600
        },
        secondary: {
          light: '#818cf8', // indigo-400
          DEFAULT: '#6366f1', // indigo-500
          dark: '#4f46e5', // indigo-600
        },
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, var(--tw-gradient-stops))',
        'button-gradient': 'linear-gradient(135deg, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'button-hover': '0 5px 15px var(--button-hover-shadow, rgba(56, 189, 248, 0.3))',
        'card': '0 20px 50px rgba(0, 0, 0, 0.25)',
        'card-hover': '0 25px 60px rgba(0, 0, 0, 0.2)',
      },
      animation: {
        'button-shine': 'button-shine 0.7s ease forwards',
      },
      keyframes: {
        'button-shine': {
          '0%': { left: '-100%' },
          '100%': { left: '100%' },
        },
      },
    },
  },
  plugins: [],
}
