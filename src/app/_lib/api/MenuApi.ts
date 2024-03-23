import { MainMenuDocument } from '@/app/_lib/_graphql/cms/generated';

import { cmsUrqlClient } from '@/app/_lib/urqlClient';

export interface MenuElement {
  Label: string;
  Url: string | null;
  Target: string;
  Links: MenuElement[] | null;
}

export const MenuApi = {
  async getMenu(locale: string) {
    const { data } = await cmsUrqlClient
      .query(MainMenuDocument, { locale })
      .toPromise();

    if (!data || !data.navigationHeader?.data) {
      return null;
    }

    return data.navigationHeader.data.attributes?.MenuBody;
  },
};
