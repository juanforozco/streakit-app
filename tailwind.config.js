/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Baloo 2"', 'sans-serif'],
        body: ['Nunito', 'sans-serif'],
      },
      keyframes: {
        'flame-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.08)' },
        },
        'pop-in': {
          '0%': { transform: 'scale(0.6)', opacity: '0' },
          '60%': { transform: 'scale(1.08)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'confetti-fall': {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(160px) rotate(540deg)', opacity: '0' },
        },
        'toast-in': {
          '0%': { transform: 'translate(-50%, -12px)', opacity: '0' },
          '100%': { transform: 'translate(-50%, 0)', opacity: '1' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      animation: {
        'flame-pulse': 'flame-pulse 1.6s ease-in-out infinite',
        'pop-in': 'pop-in 0.4s ease-out',
        'confetti-fall': 'confetti-fall 1s ease-in forwards',
        'toast-in': 'toast-in 0.3s ease-out forwards',
        wiggle: 'wiggle 0.6s ease-in-out',
      },
    },
  },
  plugins: [],
};
