import { cmsUrqlClient } from '@/app/_lib/urqlClient';
import { PrivacyPolicyContentDocument } from '../_graphql/cms/generated';

export type PrivacyPolicy = {
  attributes: {
    createdAt: string;
    publishedAt: string;
    updatedAt: string;
    locale: string;
    LegalContent: string;
  };
};
export const PrivacyPolicyApi = {
  async getPrivacyPolicyContent(locale: string) {
    const { data } = await cmsUrqlClient
      .query(PrivacyPolicyContentDocument, { locale: locale })
      .toPromise();

    if (!data) {
      return null;
    }

    return data.privacyPolicy?.data;
  },
};
