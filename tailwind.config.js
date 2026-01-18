const rtl = require('tailwindcss-rtl');

module.exports = {
  content: [
    './src/**/*.{html,ts,scss,css}',
  ],
theme: {
    extend: {
      animation: {
        'slow-pulse': 'softPulse 10s ease-in-out infinite',
      },
      keyframes: {
        softPulse: {
          '0%, 100%': { transform: 'scale(1.05)', opacity: '0.8' },
          '50%': { transform: 'scale(1)', opacity: '1' },
        }
      }
    },
  },
  plugins: [
    rtl,
  ],
};
