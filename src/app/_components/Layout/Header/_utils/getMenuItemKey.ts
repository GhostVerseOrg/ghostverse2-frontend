import { MenuElement } from '@/app/_lib/api/MenuApi';

export const getMenuItemKey = (menuItem: MenuElement) => {
  return menuItem.Url || menuItem.Label;
};
