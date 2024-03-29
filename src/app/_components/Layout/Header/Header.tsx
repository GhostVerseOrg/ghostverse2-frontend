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
      className="fixed inset-x-0 top-0 z-50 bg-black border-b border-gray-800"
    >
      <div className="hidden md:flex w-full justify-between items-center p-3 lg:px-20 max-w-[1800px] mx-auto">
        <DesktopMenu menuItems={menuItems} />
      </div>
      <div className="md:hidden right-0 relative bg-black flex justify-between items-center w-full p-4">
        <MobileMenu menuItems={menuItems} />
      </div>
    </header>
  );
};
