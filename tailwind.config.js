/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#445648',
          light: '#536958',
          dark: '#354F42',
        },
        secondary: {
          DEFAULT: '#F5EFE3',
          dark: '#EAE3D2',
        },
        accent: {
          gold: '#D6AE4D',
          goldLight: '#E5C989',
          goldDark: '#B89035',
        },
        coffee: {
          DEFAULT: '#351E13',
          light: '#523120',
          dark: '#25140C',
        },
        dark: {
          DEFAULT: '#2A2A2A',
          lighter: '#4A4A4A',
        }
      },
      fontFamily: {
        sans: ['"Montserrat"', 'sans-serif'],
        montserrat: ['"Montserrat"', 'sans-serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
      },
      boxShadow: {
        'gold': '0 10px 30px -10px rgba(214, 174, 77, 0.4)',
        'luxury': '0 20px 40px -15px rgba(68, 86, 72, 0.18)',
        'glass': '0 8px 32px 0 rgba(68, 86, 72, 0.14)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gold-gradient': 'linear-gradient(135deg, #D6AE4D 0%, #E5C989 50%, #B89035 100%)',
        'dark-gradient': 'linear-gradient(180deg, #445648 0%, #354F42 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        }
      }
    },
  },
  plugins: [],
}
