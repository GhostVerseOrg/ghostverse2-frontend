import { getTranslations } from 'next-intl/server';
import { unstable_setRequestLocale } from 'next-intl/server';
import { PageSettingsApi } from '@/app/_lib/api/pageSettingsApi';
import { Layout } from '@/app/_components/Layout/Layout';
import { ProtectedPageWrapper } from '@/app/_components/port/useElvenDapp/elven-ui/protected-page-wrapper';
import { SimpleDemo } from '@/app/_components/port/useElvenDapp/demo/simple-demo';
import { GetUserDataDemo } from '@/app/_components/port/useElvenDapp/demo/get-user-data-demo';
import { ProfileNFTsList } from '@/app/_components/port/GhostVerseDapp/ProfileNFTsList';
import { CreateCollectionForm } from '@/app/[locale]/dashboard/_components/SimpleCreateCollection-demo';
import { ActivateCollectionForm } from './_components/SimpleActivateCollection-demo';
import { CreateNFTForm } from './_components/CreateNFT-demo';

// @ts-ignore
export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const pageStaticData = await getStaticPageDetails(locale);

  return (
    <ProtectedPageWrapper>
      <Layout
        // @ts-ignore
        menuItems={pageStaticData.menuItems}
        classNameCustom="bg-white px-5 bg-colr-d-bg text-gray-100"
      >
        <div className="w-full min-w-full">
          <header className="py-14 lg:py-20">
            <div className="m-auto max-w-[1280px]">
              <div className="text-3xl font-medium">Dashboard</div>

              <CreateCollectionForm />
              <ActivateCollectionForm />
              <CreateNFTForm />

              <SimpleDemo />
              <GetUserDataDemo />
              <ProfileNFTsList />
            </div>
          </header>
        </div>
      </Layout>
    </ProtectedPageWrapper>
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
