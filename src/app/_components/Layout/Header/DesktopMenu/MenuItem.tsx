import Link from 'next/link';
import { MenuElement } from '@/app/_lib/api/MenuApi';

type Props = {
  menuItem: MenuElement;
  onMenuItemClick?: () => void;
};

export const DesktopMenuItem = ({ menuItem, onMenuItemClick }: Props) => {
  if (!menuItem.Url) {
    return null;
  }

  return (
    <Link
      href={menuItem.Url}
      target={`_${menuItem.Target}`} // Strapi GraphQL removes underline from _blank in enum, add manually
      rel="noopener noreferrer"
      className="py-3
      hover:text-colr-ghostverse-teal duration-200"
      onClick={onMenuItemClick}
    >
      {menuItem.Label}
    </Link>
  );
};
