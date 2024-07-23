import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      boxShadow: {
        input:
          '0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)',
      },
      fontFamily: {
        'philosopher-regular': ['Philosopher', 'sans-serif'],
        // https://nextjs.org/docs/app/building-your-application/optimizing/fonts#local-fonts
        cubic10: ['var(--cubic-10)'],
        cubic12: ['var(--cubic-12)'],
      },
      screens: {
        xs: '320px',
        '4k': '2560px', // New breakpoint for 4K screens.
      },
      colors: {
        'colr-ghostverse-teal': '#0080e4',
        'colr-greenghost-teal': '#13de00',
        'colr-l-primary': '#b4b4b4',
        'colr-l-secondary': '#284d5a', // unused
        'colr-d-primary': '#475569', // unused
        'colr-d-secondary': '#D1D5DB', // unuse
        'colr-l-fg': '#dadada',
        'colr-l-bg': '#000000',
        'colr-d-fg': '#ccceef',
        'colr-d-bg': '#070710',
        'colr-d-btn': '#070710',
        'ghost-color2': '#e5e8f1',
      },
    },
  },
  // Plugin for container-query trick within Tailwind CSS.
  plugins: [require('@tailwindcss/container-queries')],
};

export default config;
