import { getTranslations } from 'next-intl/server';
import { unstable_setRequestLocale } from 'next-intl/server';
import { PageSettingsApi } from '@/app/_lib/api/pageSettingsApi';
import { Layout } from '@/app/_components/Layout/Layout';
import { ProtectedPageWrapper } from '@/app/_components/port/useElvenDapp/elven-ui/protected-page-wrapper';
import { Launchpad } from './_components/Launchpad';

// @ts-ignore
export default async function Page({
  params: { locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
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
            <div className="m-auto max-w-[1280px] justify-center">
              {/* <h1 className="text-3xl lg:text-5xl font-bold lg:leading-tight text-center">
                Update the Metaverse
              </h1> */}

              <Launchpad currentStep={String(searchParams['step'])} />

              {/* {(currentStep === "create-collection") ?
                <CreateCollectionForm />
                : null
              }

              {(currentStep === "activate-collection") ?
                <ActivateCollectionForm />
                : null
              }

              {(currentStep === "create-nft") ?
                <CreateNFTForm />
                : null
              } */}
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
