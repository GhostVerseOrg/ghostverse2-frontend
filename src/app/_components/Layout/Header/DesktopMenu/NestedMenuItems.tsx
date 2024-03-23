import { ReactNode } from 'react';
import { MenuElement } from '@/app/_lib/api/MenuApi';
import { Menu } from '@headlessui/react';
import { getMenuItemKey } from '@/app/_components/Layout/Header/_utils/getMenuItemKey';
import { DropdownMenu } from '@/app/_components/Layout/DrodpownMenu';
import Link from 'next/link';

type Props = {
  parentMenuItem: MenuElement;
};

const MenuItemWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <span
          className={`${
            active ? 'bg-gray-300' : ''
          }  cursor-pointer group flex w-full items-center rounded-lg`}
        >
          {children}
        </span>
      )}
    </Menu.Item>
  );
};

export const NestedMenuItems = ({ parentMenuItem }: Props) => {
  if (!parentMenuItem?.Links || parentMenuItem.Links.length === 0) {
    return null;
  }

  const renderLinks = () => {
    return parentMenuItem?.Links?.map((menuItem) => {
      if (!menuItem.Url) {
        return null;
      }

      return (
        <MenuItemWrapper key={getMenuItemKey(menuItem)}>
          <Link
            href={menuItem.Url}
            target={`_${menuItem.Target}`} // Strapi GraphQL removes underline from _blank in enum, add manually
            rel="noopener noreferrer"
            className="p-2 px-5 text-base font-bold text-gray-800"
          >
            {menuItem.Label}
          </Link>
        </MenuItemWrapper>
      );
    });
  };

  return (
    <DropdownMenu title={parentMenuItem.Label}>{renderLinks()}</DropdownMenu>
  );
};
