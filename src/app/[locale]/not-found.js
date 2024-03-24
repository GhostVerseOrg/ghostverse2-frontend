import { getTranslations } from 'next-intl/server';
import { PageSettingsApi } from '@/app/_lib/api/pageSettingsApi';
import { Layout } from '@/app/_components/Layout/Layout';
import Image from 'next/image';
import Link from 'next/link';

// @ts-ignore
export default async function Custom404(params) {
  const pageStaticData = await getStaticPageDetails(params.locale);

  return (
    <Layout
      // @ts-ignore
      menuItems={pageStaticData.menuItems}
      classNameCustom="px-5 bg-colr-d-bg text-gray-100"
    >
      <div className="flex flex-col md:flex-row items-center justify-center m-auto h-full md:min-w-4/6 py-12 mx-auto">
        <div className="md:w-1/2">
          <Image
            src="/assets/icons/404.svg"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
          />
        </div>

        <div className="md:w-1/2 flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-bold md:mb-4 text-center md:text-left">
            404
          </h1>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center md:text-left">
            Not Found
          </h1>

          <p className="text-lg md:text-xl mb-8 text-center md:text-left max-w-[400px]">
            Oops! The page you are looking for could not be found.
          </p>
          <Link
            href="/"
            className="
            px-6 py-3 w-fit bg-blue-500 rounded-lg mx-auto md:mx-0
            hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Go to Home
          </Link>
        </div>
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
