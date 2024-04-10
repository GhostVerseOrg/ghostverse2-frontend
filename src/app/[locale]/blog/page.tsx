import { getTranslations } from 'next-intl/server';
import { unstable_setRequestLocale } from 'next-intl/server';
import { PageSettingsApi } from '@/app/_lib/api/pageSettingsApi';
import { Layout } from '@/app/_components/Layout/Layout';
import { BlogsApi } from '@/app/_lib/api/BlogsApi';
import { BlogPaginationHandler } from '@/app/[locale]/blog/_components/Pagination/PaginationHandler';
import { BlogCard } from '@/app/[locale]/blog/_components/Card/Card';
import { IconTypes } from '@/app/[locale]/blog/_components/Button/Button';
import { notFound } from 'next/navigation';

// @ts-ignore
export default async function Page({
  params: { locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  unstable_setRequestLocale(locale);

  // When "Blog" is clicked twice in the menu it removes URL parameter so the
  // page attribute is removed from URL, update value only if it exists.
  let currentPage = 1;
  if (Number(searchParams['page'])) {
    currentPage = Number(searchParams['page']);
  }

  const pageStaticData = await getStaticPageDetails(locale);
  const blogsData = await getBlogsPreview(locale, currentPage);

  // Simplify data access for code above.
  const blogsDataUnpacked = blogsData[0];
  // We show featured post on 1 blog page and just show simple grid of blogs on next pages.
  const blogsDataWithOrWithoutFeaturedPost =
    currentPage === 1
      ? blogsDataUnpacked.blogs.slice(1)
      : blogsDataUnpacked.blogs;

  return (
    <Layout
      // @ts-ignore
      menuItems={pageStaticData.menuItems}
      classNameCustom="bg-white px-5 bg-colr-d-bg text-gray-100"
    >
      <div className="w-full min-w-full">
        <div className="w-full space-y-6 lg:space-y-8 my-20 text-center">
          <h1 className="text-3xl lg:text-5xl font-bold lg:leading-tight">
            Ghost Chronicles
          </h1>
          <p className="text-lg text-colr-l-primary leading-relaxed my-5">
            Whispers from the Ethereal Ink: The Ghost Chronicles
          </p>
        </div>

        {blogsDataUnpacked.blogs.length > 0 ? (
          <div className="pb-[80px] @container m-auto max-w-[1280px]">
            {currentPage === 1 ? (
              <BlogCard
                authorName={blogsDataUnpacked.blogs[0].attributes?.AuthorName}
                publishedAt={blogsDataUnpacked.blogs[0].attributes?.publishedAt}
                minutesToRead={
                  blogsDataUnpacked.blogs[0].attributes?.MinutesToRead
                }
                key={blogsDataUnpacked.blogs[0].id}
                label={blogsDataUnpacked.blogs[0].attributes?.CategoryLabel}
                color={blogsDataUnpacked.blogs[0].attributes?.CategoryColor}
                title={blogsDataUnpacked.blogs[0].attributes?.Title}
                summary={blogsDataUnpacked.blogs[0].attributes?.Summary}
                href={`/blog/${blogsDataUnpacked.blogs[0].attributes?.Slug}`}
                imageSrc={
                  blogsDataUnpacked.blogs[0].attributes?.Thumbnail?.data
                    ?.attributes?.url
                }
                btnIcon={IconTypes.ARROW_RIGHT}
                imageAlt="Featured Image"
                btnLabel="Read More"
              />
            ) : null}

            <div className="flex flex-wrap w-full justify-start gap-x-[2%]">
              {/* Slice(1) helps us to avoid first featured element here, blogs are already sorted by date */}
              {blogsDataWithOrWithoutFeaturedPost.map(
                // @ts-ignore
                (blog) => (
                  <div
                    key={blog.id}
                    className="flex-1 @container min-w-full @4xl:min-w-[32%] @4xl:max-w-[32%]"
                  >
                    <BlogCard
                      authorName={blog.attributes?.AuthorName}
                      publishedAt={blog.attributes?.publishedAt}
                      minutesToRead={blog.attributes?.MinutesToRead}
                      label={blog.attributes?.CategoryLabel}
                      color={blog.attributes?.CategoryColor}
                      title={blog.attributes?.Title}
                      summary={blog.attributes?.Summary}
                      href={`/blog/${blog.attributes?.Slug}`}
                      imageSrc={
                        blog.attributes?.Thumbnail?.data?.attributes?.url
                      }
                      btnIcon={IconTypes.ARROW_RIGHT}
                      imageAlt="Featured Image"
                      btnLabel="Read More"
                    />
                  </div>
                ),
              )}
            </div>

            <div className="mt-20 flex justify-center">
              <BlogPaginationHandler blogsData={blogsDataUnpacked} />
            </div>
          </div>
        ) : (
          notFound()
        )}
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

const getBlogsPreview = async (locale: string, query?: number) => {
  const page = query || 1;

  // We show featured post on 1 blog page and just show simple grid of blogs on next pages.
  // Take into account we utilized 7 blog posts on main page and 6 on next pages, offset 1.
  if (page === 1) {
    return await Promise.all([
      BlogsApi.getBlogsPreviews(Number(page), locale, 7, 0),
    ]);
  } else {
    return await Promise.all([
      BlogsApi.getBlogsPreviews(Number(page), locale, 6, 1),
    ]);
  }
};

// We don't use Fetch() API, we use urql instead, so we use route segmet config to specify "revalidate" interval.
// https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#time-based-revalidation
export const revalidate = 5;
