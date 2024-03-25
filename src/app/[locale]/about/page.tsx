import { getTranslations } from 'next-intl/server';
import { unstable_setRequestLocale } from 'next-intl/server';
import { AuthRedirectWrapper } from '@/app/_wrappers/AuthRedirectWrapper';
import { PageSettingsApi } from '@/app/_lib/api/pageSettingsApi';
import { Layout } from '@/app/_components/Layout/Layout';
import { About } from './_components/About';

// @ts-ignore
export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const pageStaticData = await getStaticPageDetails(locale);

  return (
    <AuthRedirectWrapper requireAuth={false}>
      <Layout
        // @ts-ignore
        menuItems={pageStaticData.menuItems}
        classNameCustom="bg-white px-5 bg-colr-d-bg text-gray-100"
      >
        <div className="w-full min-w-full">
          <header className="py-14 lg:py-20">
            <div className="m-auto max-w-[1280px]">
              <About />
            </div>
          </header>
        </div>
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

// We don't use Fetch() API, we use urql instead, so we use route segmet config to specify "revalidate" interval.
// https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#time-based-revalidation
export const revalidate = 5;
