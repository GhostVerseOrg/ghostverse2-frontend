import { cmsUrqlClient } from '@/app/_lib/urqlClient';
import { TermsOfUseContentDocument } from '../_graphql/cms/generated';

export type TermsOfUse = {
  attributes: {
    createdAt: string;
    publishedAt: string;
    updatedAt: string;
    locale: string;
    LegalContent: string;
  };
};
export const TermsOfUseApi = {
  async getTermsOfUseContent(locale: string) {
    const { data } = await cmsUrqlClient
      .query(TermsOfUseContentDocument, { locale: locale })
      .toPromise();

    if (!data) {
      return null;
    }

    return data.termsOfUse?.data;
  },
};
