import { getTranslations } from 'next-intl/server';
import { unstable_setRequestLocale } from 'next-intl/server';
import { PageSettingsApi } from '@/app/_lib/api/pageSettingsApi';
import { Layout } from '@/app/_components/Layout/Layout';
import { Team } from './_components/Team';

// @ts-ignore
export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const pageStaticData = await getStaticPageDetails(locale);

  return (
    <Layout
      // @ts-ignore
      menuItems={pageStaticData.menuItems}
    >
      <div className="w-full min-w-full px-5">
        <header className="py-14 lg:py-20">
          <div className="m-auto max-w-[1280px]">
            <Team />
          </div>
        </header>
      </div>
    </Layout>
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
