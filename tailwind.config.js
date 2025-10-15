/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'border-gray-200',
    'dark:border-gray-700',
    'bg-gray-50',
    'text-gray-900',
    'dark:bg-gray-900',
    'dark:text-gray-100'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7C5CFB',
        secondary: '#6C63FF',
        accent: '#FF6B6B',
        success: '#4ECDC4',
        warning: '#FFE66D',
        error: '#FF6B6B',
      },
      boxShadow: {
        'neumorphic-light': '8px 8px 16px rgba(0,0,0,0.1), -8px -8px 16px rgba(255,255,255,0.7)',
        'neumorphic-dark': '8px 8px 16px rgba(0,0,0,0.7), -8px -8px 16px rgba(255,255,255,0.1)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      backdropBlur: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
