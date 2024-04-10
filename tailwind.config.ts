import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 8px 2px rgba(252, 211, 77, 0.6)',
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
        '4k': '2560px', // New breakpoint for 4K screens.
      },
      colors: {
        'colr-ghostverse-teal': '#0080e4',
        'colr-greenghost-teal': '#13de00',
        'colr-l-primary': '#b4b4b4',
        'colr-l-secondary': '#284d5a',
        'colr-d-primary': '#475569',
        'colr-d-secondary': '#D1D5DB',
        'colr-l-fg': '#dadada',
        'colr-l-bg': '#000000',
        'colr-d-fg': '#ccceef',
        'colr-d-bg': '#070710',
        'colr-d-btn': '#070710',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  // Plugin for container-query trick within Tailwind CSS.
  plugins: [require('@tailwindcss/container-queries')],
};

export default config;
