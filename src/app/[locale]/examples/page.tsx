import React from 'react';
import { getTranslations } from 'next-intl/server';
import { unstable_setRequestLocale } from 'next-intl/server';
import { AuthRedirectWrapper } from '@/app/_wrappers/AuthRedirectWrapper';
import { PageWrapper } from '@/app/_wrappers/PageWrapper';
import { PageSettingsApi } from '@/app/_lib/api/pageSettingsApi';
import { Layout } from '@/app/_components/Layout/Layout';

import DummyEntitySummary1 from '@/app/[locale]/examples/_data/DummyEntitySummary1';
import DummyEntitySummary2 from '@/app/[locale]/examples/_data/DummyEntitySummary2';

import BasicCard from '@/app/[locale]/examples/_components/ExampleCards/BasicCard';
import ImageCard from '@/app/[locale]/examples/_components/ExampleCards/ImageCard';
import ProfileCard from '@/app/[locale]/examples/_components/ExampleCards/ProfileCard';
import InteractiveCard from '@/app/[locale]/examples/_components/ExampleCards/InteractiveCard';
import HorizontalCard from '@/app/[locale]/examples/_components/ExampleCards/HorizontalCard'; // Adjust the import path based on your project structure
import ExpandableCard from '@/app/[locale]/examples/_components/ExampleCards/ExpandableCard'; // Adjust the import path as needed
import HeroBanner from '@/app/[locale]/examples/_components/ExampleCards/HeroBanner';
import TreasuryReservesCard from './_components/GoldenGradient/TreasuryReservesCard';
import { EntitySummaryCard } from './_components/Statistics/EntitySummary';

// @ts-ignore
export default async function Page({ params: { locale } }) {
  unstable_setRequestLocale(locale);
  // By passing an explicit locale to the awaitable functions from next-intl,
  // we can make the metadata handler eligable for static rendering.
  const t = await getTranslations({ locale: locale });

  const pageStaticData = await getStaticPageDetails(locale);

  const cardsData = [
    {
      title: t('mainPageTitle'),
      description: t('mainPageDescription'),
      imageUrl: '/path-to-your-image.jpg',
    },
  ];

  const treasuryFunds = '$661,708.69'; // This would be fetched dynamically

  return (
    <AuthRedirectWrapper requireAuth={false}>
      <Layout
        // @ts-ignore
        menuItems={pageStaticData.menuItems}
        classNameCustom="bg-colr-d-bg"
      >
        <PageWrapper>
          <div className="max-w-[1280px] md:py-10 mx-auto">
            {/* Top card section */}
            <HeroBanner />

            {/* Items section */}
            <div className="flex flex-col md:flex-row items-center justify-center p-2">
              <div className="w-full md:w-1/2 p-2 justify-center flex">
                <InteractiveCard
                  title="Acces DeFi Services Now"
                  description="Borrow or Deposit, choose your preference."
                />
              </div>
              <div className="flex flex-col md:w-1/2 p-2">
                <ProfileCard
                  avatarUrl="assets/img/v_avatar.png"
                  name="The Banished"
                  socialLinks={[
                    {
                      icon: <span>Connect on Social</span>,
                      url: '',
                    },
                  ]}
                />
              </div>
              <div className="w-full md:w-1/2 p-2 flex flex-col">
                <HorizontalCard
                  imageUrl="/assets/img/graph.jpg" // Provide the correct path to your image
                  title="Your Title Here"
                  description="This is a description of the media content."
                />
                <HorizontalCard
                  imageUrl="/assets/img/graph.jpg" // Provide the correct path to your image
                  title="Your Title Here"
                  description="This is a description of the media content."
                />
              </div>
            </div>

            {/* Total guaranteed certificates */}
            <div className="flex items-center justify-center p-1">
              <EntitySummaryCard transactions={DummyEntitySummary1} />
            </div>

            {/* DeFi lending stats */}
            <div className="flex items-center justify-center p-1">
              <EntitySummaryCard transactions={DummyEntitySummary2} />
            </div>

            {/* Treasury reserves */}
            <div className="max-w-screen-xl py-1 mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center p-0"
                  >
                    <TreasuryReservesCard treasuryFunds={treasuryFunds} />
                  </div>
                ))}
              </div>
            </div>

            {/* Expandable card section */}
            <div className="space-y-4">
              <ExpandableCard
                title="Expandable Card Title"
                summary="This is a summary of the content."
                details="Here are the expanded details that you will see when you click the 'Show More' button."
              />
            </div>

            {/* Example interactive card */}
            <div className="flex items-center justify-center p-2">
              <InteractiveCard
                title="Interactive Card Title"
                description="This is an interactive card with buttons and a slider."
              />
            </div>

            {/* Basic and social cards line */}
            <div className="flex items-center justify-center mx-auto p-4 sm:p-6 lg:p-8">
              <BasicCard
                title="Basic Card"
                content="This is a basic card."
                footer="Footer Text"
              />
              <ProfileCard
                avatarUrl="assets/img/v_avatar.png"
                name="The Banished"
                socialLinks={[
                  {
                    icon: <span>Connect on Social</span>,
                    url: '',
                  },
                ]}
              />
            </div>

            {/* Image card */}
            <div className="flex items-center justify-center p-2">
              <ImageCard
                imageUrl="/assets/img/testpic1.jpg"
                title="Image Card"
              />
            </div>
          </div>
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
