import React from 'react';
import { Footer } from '@/app/_components/Layout/Footer';
import { Header } from '@/app/_components/Layout/Header';
import { twMerge } from 'tailwind-merge';
import { MenuElement } from '@/app/_lib/api/MenuApi';

type Props = {
  children: React.ReactNode;
  menuItems: MenuElement[];
  classNameCustom?: string;
};

export const Layout = ({ children, menuItems, classNameCustom }: Props) => {
  return (
    <div className="flex min-h-screen flex-col scroll-smooth bg-colr-l-bg text-colr-l-fg">
      <Header menuItems={menuItems} />
      <main
        className={twMerge(
          'flex grow items-stretch justify-center pt-20',
          classNameCustom,
        )}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};
