const dotenvExpand = require('dotenv-expand');

const withNextIntl = require('next-intl/plugin')('./src/i18n.ts');

// Add dotenv to expand variables from Vercel and so on in the deployment pipeline, like $NEXT_PUBLIC_VERCEL_URL
dotenvExpand.expand({ parsed: { ...process.env } });

/** @type {import('next').NextConfig} */
const nextConfig = {
  // https://nextjs.org/docs/pages/api-reference/next-config-js/output
  // This feature helps reduce the size of deployments drastically.
  // Previously, when deploying with Docker you would need to have all files from your package's dependencies installed to run next start.
  // Starting with Next.js 12, you can leverage Output File Tracing in the .next/ directory to only include the necessary files.
  output: 'standalone',

  // Time in seconds for static generation before timing out.
  // This helps avoid the crash when Strapi instance is sleeping, or it takes longer than expected.
  staticPageGenerationTimeout: 180,

  // Extend logging into terminal to see cache hit and more information about URLs fetching from.
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  // Allow all image hosts, lock remote pattern to only production-ones when we have some known domain name for storage.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = withNextIntl(nextConfig);
