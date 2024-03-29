import { getTranslations } from 'next-intl/server';
import { unstable_setRequestLocale } from 'next-intl/server';
import { AuthRedirectWrapper } from '../../../_wrappers/AuthRedirectWrapper';
import { Layout } from '../../../_components/Layout/Layout';
import { PageSettingsApi } from '../../../_lib/api/pageSettingsApi';
import Image from 'next/image';
import { BlogsApi } from '../../../_lib/api/BlogsApi';
import { Breadcrumbs } from '../../../_components/Layout/Breadcrumbs/Breadcrumbs';
import { format, parseISO } from 'date-fns';
import { BlogShareLinks } from './_components/SocialLinks';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';

// @ts-ignore
export default async function BlogDetails({ params: { locale, slug } }) {
  unstable_setRequestLocale(locale);
  // By passing an explicit locale to the awaitable functions from next-intl,
  // we can make the metadata handler eligable for static rendering.
  const t = await getTranslations({ locale: locale });
  const pageStaticData = await getStaticPageDetails(locale);

  const blogData = await getBlogContent(locale, slug);
  if (blogData.blogsData.length === 0) notFound(); // redirect to 404
  const blog = blogData.blogsData[0];

  const breadcrumbs = [
    {
      link: '/blog',
      label: t('blogPageTitle'),
      isActive: false,
    },
    {
      link: `/blog/${slug}`,
      label: blog.attributes.Title,
      isActive: true,
    },
  ];

  // prettier-ignore
  const reactMarkdownComponents = {
    p: ({ node, ...props }) => <p className="leading-7" {...props} />,
    h1: ({ node, ...props}) => <h1 className="font-bold text-4xl" {...props} />,
    h2: ({ node, ...props }) => <h2 className="font-semibold text-3xl" {...props} />,
    h3: ({ node, ...props }) => <h2 className="font-semibold text-2xl" {...props} />,
    h4: ({ node, ...props }) => <h2 className="font-semibold text-xl" {...props} />,
    h5: ({ node, ...props }) => <h2 className="font-semibold text-xl" {...props} />,
    h6: ({ node, ...props }) => <h2 className="font-semibold text-lg" {...props} />,
    ol: ({ node, ...props }) => <ol className="text-lg font-medium ml-5 list-decimal" {...props} />,
    ul: ({ node, ...props }) => <ul className="text-lg font-medium ml-5 list-disc" {...props} />,
    a: ({ node, ...props }) => <a className="text-lg font-semibold italic underline" {...props} />,
    iframe: ({ node, ...props }) => <iframe className="mx-auto max-w-full h-auto aspect-video" {...props} />,
    img: ({ node, ...props }) => <img className="mb-5" {...props} />,
  };

  return (
    <AuthRedirectWrapper requireAuth={false}>
      <Layout
        // @ts-ignore
        menuItems={pageStaticData.menuItems}
        classNameCustom="px-5 bg-colr-d-bg text-gray-100"
      >
        <div className="w-full min-w-full">
          <div className="max-w-4xl flex flex-col m-auto pt-8">
            {/* Navigation breadcrumbs */}
            <Breadcrumbs breadcrumbs={breadcrumbs} />

            {/* Category label */}
            <div
              className={`
                blog_text_c_orange text-base font-semibold pt-8 lg:pt-12 py-2
                blog_text_c_${blog.attributes.CategoryColor}`}
            >
              {blog.attributes.CategoryLabel}
            </div>

            {/* Title */}
            <div className="text-4xl font-bold">{blog.attributes.Title}</div>

            {/* Date and social links*/}
            <div className="flex justify-between pt-3 text-gray-500">
              <span className="text-sm">
                {format(parseISO(blog.attributes.publishedAt), 'MMMM dd, yyyy')}
              </span>
              <BlogShareLinks />
            </div>

            {/* Featured image */}
            <div className="relative w-full aspect-video my-5 lg:my-6">
              <Image
                className="blog_shadow rounded-xl object-cover"
                src={blog.attributes.FeaturedImage?.data?.attributes?.url}
                alt="Featured Image"
                fill={true}
              />
            </div>

            {/* Markdown content */}
            <div className="mb-24 text-base lg:text-lg min-w-full">
              <ReactMarkdown
                className="whitespace-pre-line"
                components={reactMarkdownComponents}
                rehypePlugins={[rehypeRaw]}
                remarkPlugins={[remarkGfm]}
              >
                {blog.attributes.Content}
              </ReactMarkdown>
            </div>
          </div>
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

export async function generateStaticParams() {
  const slugs = await BlogsApi.getAllSlugs('all');

  return slugs.map((slug) => {
    return {
      slug: slug.Slug,
      locale: slug.locale,
    };
  });
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

const getBlogContent = async (locale, slug) => {
  const [blogsData] = await Promise.all([BlogsApi.findBySlug(slug, locale)]);

  return {
    blogsData: blogsData,
  };
};
