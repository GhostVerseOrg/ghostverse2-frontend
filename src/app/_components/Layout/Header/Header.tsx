import { DesktopMenu } from '@/app/_components/Layout/Header/DesktopMenu/DesktopMenu';
import { MenuElement } from '@/app/_lib/api/MenuApi';
import { MobileMenu } from '@/app/_components/Layout/Header/MobileMenu';

type Props = {
  menuItems: MenuElement[];
};

export const Header = ({ menuItems }: Props) => {
  return (
    <header
      id="header"
      className="flex items-center border-b border border-gray-800"
    >
      <div className="hidden w-full md:block text-white">
        <DesktopMenu menuItems={menuItems} />
      </div>
      <div className="z-50 md:hidden right-0">
        <MobileMenu menuItems={menuItems} />
      </div>
    </header>
  );
};
