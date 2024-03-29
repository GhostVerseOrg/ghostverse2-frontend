import React from 'react';
import { getTranslations } from 'next-intl/server';
import { unstable_setRequestLocale } from 'next-intl/server';
import { AuthRedirectWrapper } from '@/app/_wrappers/AuthRedirectWrapper';
import { PageWrapper } from '@/app/_wrappers/PageWrapper';
import { PageSettingsApi } from '@/app/_lib/api/pageSettingsApi';
import { Layout } from '@/app/_components/Layout/Layout';
import { ProjectCards } from './_components/Projects/projects';
import { Hero } from './_components/Sections/Hero';
import { ScrollUp } from './_components/SrollToTop/ScrollToTop';

// @ts-ignore
export default async function Page({ params: { locale } }) {
  unstable_setRequestLocale(locale);
  // By passing an explicit locale to the awaitable functions from next-intl,
  // we can make the metadata handler eligable for static rendering.
  const t = await getTranslations({ locale: locale });

  const pageStaticData = await getStaticPageDetails(locale);

  return (
    <AuthRedirectWrapper requireAuth={false}>
      <Layout
        // @ts-ignore
        menuItems={pageStaticData.menuItems}
        classNameCustom=""
      >
        <PageWrapper>
          <ScrollUp />

          <Hero />

          <ProjectCards />

          {/*<FeaturesSection />
          <HowItWorksSection />
          <TestimonialsSection />
          <LatestNewsSection />
          <FinalCTASection /> */}
        </PageWrapper>
      </Layout>
    </AuthRedirectWrapper>
  );
}

// @ts-ignore
export async function generateMetadata({ params: { locale } }) {
  // Optionally integrate with static rendering in the
  // Metadata API by passing an explicit locale.
  const t = await getTranslations({ locale });

  return {
    title: t('mainPageTitle'),
    description: t('mainPageDescription'),
  };
}

// @ts-ignore
async function getStaticPageDetails(locale) {
  const pageSettings = await Promise.all([
    PageSettingsApi.getPageSettings(locale),
  ]);

  return {
    menuItems: pageSettings[0].menuItems,
  };
}

// We don't use Fetch() API, we use urql instead, so we use route segment config to specify "revalidate" interval.
// https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#time-based-revalidation
export const revalidate = 5;
