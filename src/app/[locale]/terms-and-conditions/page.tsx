import { getTranslations } from 'next-intl/server';
import { unstable_setRequestLocale } from 'next-intl/server';
import { AuthRedirectWrapper } from '@/app/_wrappers/AuthRedirectWrapper';
import { PageSettingsApi } from '@/app/_lib/api/pageSettingsApi';
import { Layout } from '@/app/_components/Layout/Layout';

import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import { TermsOfUseApi } from '@/app/_lib/api/TermsAndConditions';
import { notFound } from 'next/navigation';

// @ts-ignore
export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  // By passing an explicit locale to the awaitable functions from next-intl,
  // we can make the metadata handler eligable for static rendering.
  const t = await getTranslations({ locale: locale });
  const pageStaticData = await getStaticPageDetails(locale);

  const legalsData = await getTermsAndConditionsContent(locale);

  if (!legalsData.legalsData) notFound(); // redirect to 404
  const legals = legalsData.legalsData.attributes?.LegalContent;

  // prettier-ignore
  const reactMarkdownComponents = {
    p: ({ node, ...props }:{node:any}) => <p className="leading-7" {...props} />,
    h1: ({ node, ...props }:{node:any}) => <h1 className="font-bold text-4xl" {...props} />,
    h2: ({ node, ...props }:{node:any}) => <h2 className="font-semibold text-3xl" {...props} />,
    h3: ({ node, ...props }:{node:any}) => <h2 className="font-semibold text-2xl" {...props} />,
    h4: ({ node, ...props }:{node:any}) => <h2 className="font-semibold text-xl" {...props} />,
    h5: ({ node, ...props }:{node:any}) => <h2 className="font-semibold text-xl" {...props} />,
    h6: ({ node, ...props }:{node:any}) => <h2 className="font-semibold text-lg" {...props} />,
    ol: ({ node, ...props }:{node:any}) => <ol className="text-lg font-medium ml-5 list-decimal" {...props} />,
    ul: ({ node, ...props }:{node:any}) => <ul className="text-lg font-medium ml-5 list-disc" {...props} />,
    a: ({ node, ...props }:{node:any}) => <a className="text-lg font-semibold italic underline" {...props} />,
    iframe: ({ node, ...props }:{node:any}) => <iframe className="mx-auto max-w-full h-auto aspect-video" {...props} />,
    img: ({ node, ...props }:{node:any}) => <img className="mb-5" {...props} />,
  };

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
              <div className="text-5xl font-medium pb-10">Terms of use</div>

              {/* Markdown content */}
              <div className="mb-24 text-base lg:text-lg min-w-full">
                <ReactMarkdown
                  className="whitespace-pre-line"
                  // @ts-ignore
                  components={reactMarkdownComponents}
                  rehypePlugins={[rehypeRaw]}
                  remarkPlugins={[remarkGfm]}
                >
                  {legals}
                </ReactMarkdown>
              </div>
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

const getTermsAndConditionsContent = async (locale: any) => {
  const [legalsData] = await Promise.all([
    TermsOfUseApi.getTermsOfUseContent(locale),
  ]);

  return {
    legalsData: legalsData,
  };
};

// We don't use Fetch() API, we use urql instead, so we use route segmet config to specify "revalidate" interval.
// https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#time-based-revalidation
export const revalidate = 5;
