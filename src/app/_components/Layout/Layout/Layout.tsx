import React from 'react';
import { Footer } from '@/app/_components/Layout/Footer';
import { Header } from '@/app/_components/Layout/Header';
import { AuthenticatedRoutesWrapper } from '@/app/_components/sdkDappComponents/sdkDappComponents';
import { twMerge } from 'tailwind-merge';
import { RouteNamesEnum } from '@/app/_constants/routes';
import { routes } from '@/app/_routes';
import { MenuElement } from '@/app/_lib/api/MenuApi';

type Props = {
  children: React.ReactNode;
  menuItems: MenuElement[];
  classNameCustom?: string;
};

export const Layout = ({ children, menuItems, classNameCustom }: Props) => {
  return (
    <div className="flex min-h-screen flex-col scroll-smooth bg-colr-d-bg">
      <Header menuItems={menuItems} />
      <main
        className={twMerge(
          'flex grow items-stretch justify-center',
          classNameCustom,
        )}
      >
        <AuthenticatedRoutesWrapper
          routes={routes}
          unlockRoute={`${RouteNamesEnum.unlock}`}
        >
          {children}
        </AuthenticatedRoutesWrapper>
      </main>
      <Footer />
    </div>
  );
};
