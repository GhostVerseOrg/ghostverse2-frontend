import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 8px 2px rgba(252, 211, 77, 0.6)', // Adjust the color and spread as needed
        input:
          '0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)',
      },
      fontFamily: {
        sans: [
          'SF Pro',
          'Inter',
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        serif: ['Lora', 'serif'],
        Anta: ['Anta', 'sans-serif'],
        'permanent-marker-regular': ['Permanent Marker', 'cursive'],
        'russo-one-regular': ['Russo One', 'sans-serif'],
        'philosopher-regular': ['Philosopher', 'sans-serif'],
        'philosopher-bold': ['Philosopher', 'sans-serif'],
      },
      fontSize: {
        tiny: '0.75rem', // 12px
        huge: '3rem', // 48px
      },
      screens: {
        '4k': '2560px', // New breakpoint for 4K screens
      },
      colors: {
        'colr-mvx-teal': '#24F7DD', // Custom teal color
        'colr-l-primary': '#111827', // Light theme primary color
        'colr-l-secondary': '#4B5563', // Light theme secondary color
        'colr-d-primary': '#475569', // Dark theme primary color //bg-slate-600 //SET
        'colr-d-secondary': '#D1D5DB', // Dark theme secondary color
        'colr-l-fg': '#374151', // Light theme foreground text color
        'colr-l-bg': '#F9FAFB', // Light theme background color
        'colr-d-fg': '#F9FAFB', // Dark theme foreground text color
        'colr-d-bg': '#111827', // Dark theme background color
        'colr-d-btn': '#111827', // bg-gray-900
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      // other customizations
    },
  },
  plugins: [require('@tailwindcss/container-queries')],
};

export default config;
