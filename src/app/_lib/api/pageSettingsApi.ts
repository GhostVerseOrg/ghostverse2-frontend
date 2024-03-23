import { MenuApi } from '@/app/_lib/api/MenuApi';

// We can use this to pack async requests for page settings that are part of the global layout.
export const PageSettingsApi = {
  async getPageSettings(site: string) {
    // Extend with more settings like header/footer/colors etc.
    const [menuItems] = await Promise.all([MenuApi.getMenu(site)]);

    return {
      menuItems,
    };
  },
};
