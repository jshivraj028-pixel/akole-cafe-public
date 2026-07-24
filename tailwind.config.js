/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#123524',
          light: '#1b4d35',
          dark: '#0a2016',
        },
        secondary: {
          DEFAULT: '#F7F2E8',
          dark: '#EAE3D2',
        },
        accent: {
          gold: '#C8A96A',
          goldLight: '#E5C989',
          goldDark: '#A68748',
        },
        coffee: {
          DEFAULT: '#5A3825',
          light: '#7A4E34',
          dark: '#3D2518',
        },
        dark: {
          DEFAULT: '#2A2A2A',
          lighter: '#4A4A4A',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Poppins"', 'sans-serif'],
      },
      boxShadow: {
        'gold': '0 10px 30px -10px rgba(200, 169, 106, 0.3)',
        'luxury': '0 20px 40px -15px rgba(18, 53, 36, 0.15)',
        'glass': '0 8px 32px 0 rgba(18, 53, 36, 0.12)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gold-gradient': 'linear-gradient(135deg, #C8A96A 0%, #E5C989 50%, #A68748 100%)',
        'dark-gradient': 'linear-gradient(180deg, #123524 0%, #0a2016 100%)',
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
