import Link from 'next/link';
import { MenuElement } from '@/app/_lib/api/MenuApi';
import { twMerge } from 'tailwind-merge';

type Props = {
  menuItem: MenuElement;
  onMenuItemClick?: () => void;
  classNameCustom?: string;
};

export const MobileMenuItem = ({
  menuItem,
  onMenuItemClick,
  classNameCustom,
}: Props) => {
  if (!menuItem.Url) {
    return null;
  }

  return (
    <Link
      href={menuItem.Url}
      target={`_${menuItem.Target}`} // Strapi GraphQL removes underline from _blank in enum, add manually
      rel="noopener noreferrer"
      className={twMerge(
        'px-4 py-4 w-full flex items-center text-lg',
        classNameCustom,
      )}
      onClick={onMenuItemClick}
    >
      {menuItem.Label}
    </Link>
  );
};
