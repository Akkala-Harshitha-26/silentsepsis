/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        clinical: {
          primary: '#0A1628',
          secondary: '#1A3A5C',
          card: '#F7F9FC',
          text: '#0F1A2E',
          success: '#00B894',
          warning: '#FDCB6E',
          danger: '#E17055',
          critical: '#D63031',
          rose: '#FB7185',
          crimson: '#E11D48',
        },
        space: {
          950: '#05080F',
          900: '#0B101C',
          800: '#131A2B',
          700: '#1C2438',
          600: '#2A3450',
          400: '#8A93AC',
          300: '#B7BECF',
        },
        command: {
          bg: '#0A0E17',
          primary: '#1A2D4A',
          accent: '#00F0FF',
          danger: '#FF1744',
          warning: '#FF9100',
          safe: '#00E676',
          text: '#E8EDF5',
        },
        // A restrained, single-accent palette modeled on real product design
        // (Linear, Attio) rather than a decorative theme: mostly neutral
        // gray, one accent color, status conveyed by small dots/text rather
        // than large colored surfaces.
        brand: {
          DEFAULT: '#5E6AD2',
          hover: '#4E58B8',
          light: '#EEF0FC',
        },
        status: {
          critical: '#E5484D',
          warning: '#F5A524',
          stable: '#30A46C',
        },
        ink: {
          950: '#0D0E12',
          900: '#16171D',
          700: '#3B3D46',
          500: '#6B6E7B',
          300: '#B4B7C2',
          200: '#DDDFE5',
          100: '#EDEEF2',
          50: '#F7F8FA',
        },
        // Soft multi-color palette matching the reference: pale lavender
        // page background, white cards, one distinct accent per card
        // rather than a single theme color throughout.
        pastel: {
          bg: '#F3F5F4',
          brand: '#0E7490',
          brandLight: '#E1EFF0',
          amber: '#FDB022',
          amberLight: '#FEF3DD',
          teal: '#20C5A0',
          tealLight: '#E1F8F2',
          pink: '#E0607E',
          pinkLight: '#FBE9EE',
          ink: '#1B2426',
          sub: '#6B7A7C',
          // Dark-mode companions — same hues, shifted for a dark surface
          // instead of just inverting to gray.
          bgDark: '#12181A',
          cardDark: '#1B2426',
          borderDark: '#283335',
          inkDark: '#E9EEEE',
          subDark: '#8FA0A2',
          brandLightDark: 'rgba(14,116,144,0.16)',
          amberLightDark: 'rgba(253,176,34,0.14)',
          tealLightDark: 'rgba(32,197,160,0.14)',
          pinkLightDark: 'rgba(224,96,126,0.14)',
        },
      },
      keyframes: {
        'grid-pan': { '0%': { backgroundPosition: '0 0' }, '100%': { backgroundPosition: '48px 48px' } },
        shimmer: { '0%': { backgroundPosition: '-400px 0' }, '100%': { backgroundPosition: '400px 0' } },
        breathe: { '0%,100%': { boxShadow: '0 0 0 0 rgba(255,23,68,0.25)' }, '50%': { boxShadow: '0 0 0 10px rgba(255,23,68,0)' } },
        wave: { '0%,100%': { transform: 'scaleY(0.4)' }, '50%': { transform: 'scaleY(1)' } },
        'toast-in': { '0%': { opacity: 0, transform: 'translateY(8px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        'drawer-in': { '0%': { opacity: 0, transform: 'translateX(24px)' }, '100%': { opacity: 1, transform: 'translateX(0)' } },
      },
      animation: {
        'grid-pan': 'grid-pan 6s linear infinite',
        shimmer: 'shimmer 1.6s infinite linear',
        breathe: 'breathe 2.4s ease-in-out infinite',
        wave: 'wave 1s ease-in-out infinite',
      },
      boxShadow: {
        'glow-cyan': '0 0 24px rgba(34,211,238,0.18)',
        'glow-rose': '0 0 24px rgba(251,113,133,0.18)',
      },
      backgroundImage: {
        'gradient-risk': 'linear-gradient(135deg, #00B894 0%, #FDCB6E 50%, #E17055 100%)',
        'gradient-header': 'linear-gradient(135deg, #0A1628 0%, #1A3A5C 100%)',
        'gradient-glow-light': 'radial-gradient(circle at 50% 0%, rgba(26,58,92,0.04), transparent 60%)',
        'gradient-glow-dark': 'radial-gradient(circle at 50% 0%, rgba(56,189,248,0.10), transparent 60%)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
