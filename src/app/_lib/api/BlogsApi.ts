import { cmsUrqlClient } from '@/app/_lib/urqlClient';
import {
  BlogsPreviewDocument,
  BlogsSingleContentDocument,
  BlogsSlugsDocument,
} from '@/app/_lib/_graphql/cms/generated';

export type Image = {
  data: {
    attributes: {
      url: string;
      previewUrl: string;
      caption: string;
    };
  };
};

export type Blogs = {
  id: string;
  attributes: {
    createdAt: string;
    publishedAt: string;
    updatedAt: string;
    locale: string;
    Slug: string;
    Title: string;
    Summary: string;
    Thumbnail: Image;
    FeaturedImage: Image;
    AuthorPic: Image;
    AuthorName: string;
    MinutesToRead: number;
    Keywords: string;
    Content: string;
    CategoryColor: string;
    CategoryLabel: string;
  };
};

export type LocalizedBlogsSlug = {
  Slug: string;
  locale: string;
};

export type BlogsPreview = Pick<Blogs, 'attributes' | 'id'>;

export const BlogsApi = {
  async getBlogsPreviews(
    page: number,
    locale: string,
    count: number,
    offset: number = 0,
  ) {
    const { data } = await cmsUrqlClient
      .query(BlogsPreviewDocument, {
        limit: count,
        offset: (page - 1) * count + offset,
        locale,
      })
      .toPromise();

    return {
      total: data?.blogs?.meta.pagination.total || 0,
      blogs: data?.blogs?.data || [],
    };
  },

  async getAllSlugs(locale: string) {
    const { data } = await cmsUrqlClient
      .query(BlogsSlugsDocument, { locale: 'all' })
      .toPromise();

    if (data?.blogs?.data) {
      return data.blogs.data.map(
        (item) => item?.attributes as LocalizedBlogsSlug,
      );
    }

    return [];
  },

  async findBySlug(slug: string, locale: string) {
    const { data } = await cmsUrqlClient
      .query(BlogsSingleContentDocument, { locale: locale, slug: slug })
      .toPromise();

    if (!data) {
      return null;
    }

    return data.blogs?.data;
  },
};
