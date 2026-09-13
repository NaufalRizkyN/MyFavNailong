/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nailong: {
          50: '#fffdf0',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
        },
        candy: {
          pink: '#FF6584',
          rose: '#FF4365',
          purple: '#A855F7',
          violet: '#8B5CF6',
          yellow: '#FFD166',
          mint: '#06D6A0',
          cyan: '#118AB2',
          peach: '#FF9E7D',
        }
      },
      animation: {
        'bounce-slow': 'bounce 2.5s infinite',
        'float': 'float 3.5s ease-in-out infinite',
        'float-reverse': 'floatRev 4s ease-in-out infinite',
        'wiggle': 'wiggle 1.2s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        floatRev: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(14px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(4deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 15px rgba(255, 182, 0, 0.6))' },
          '50%': { opacity: '0.85', filter: 'drop-shadow(0 0 25px rgba(255, 105, 180, 0.8))' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        }
      }
    },
  },
  plugins: [],
};
