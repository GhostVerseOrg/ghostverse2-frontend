'use client';
import { MobileMenuItem } from './MenuItem';
import { MobileLanguageMenu } from '@/app/_components/Layout/Header/MobileMenu/MobileLanguageMenu';
import { NestedMenuItems } from './NestedMenuItems';
import { getMenuItemKey } from '@/app/_components/Layout/Header/_utils/getMenuItemKey';
import clsx from 'clsx';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';
import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { MenuElement } from '@/app/_lib/api/MenuApi';
import Link from 'next/link';
import { LoginModalButton } from '@/app/_components/port/useElvenDapp/elven-ui/login-modal-button';
import { useLogin } from '@useelven/core';

type Props = {
  menuItems: MenuElement[];
};

export const MobileMenu = ({ menuItems }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn } = useLogin();

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const renderLinks = () => {
    return menuItems?.map((item) => {
      // Parent element to keep child-links together.
      if (item.Links && item.Links.length > 0) {
        return (
          <NestedMenuItems
            parentMenuItem={item}
            key={getMenuItemKey(item) + uuidv4()}
            onMenuItemClick={toggleMenu}
          />
        );
      }

      if (!item.Url) {
        return null;
      }

      if (item.Url) {
        return (
          <div key={item.Url + uuidv4()}>
            <MobileMenuItem
              menuItem={item}
              onMenuItemClick={toggleMenu}
              key={getMenuItemKey(item) + uuidv4()}
            />
          </div>
        );
      }
    });
  };

  return (
    <>
      <Link
        href="/"
        className="shrink-0 flex justify-between items-center mx-0 z-50"
      >
        <Image
          src="/assets/img/logo-ghostverse.png"
          alt="GhostVerse"
          width={200}
          height={40}
          priority
        />
      </Link>

      <button
        onClick={toggleMenu}
        className="p-2 relative inline-flex w-12 h-12 items-center justify-center bg-colr-ghostverse-teal rounded-full z-50"
      >
        {/* Button to open the menu */}
        <Bars3Icon
          className={`
                  ${isMenuOpen ? 'opacity-0 rotate-90 ' : 'delay-200'}
                  transition-all duration-300 
                  absolute h-8 w-8 fill-gray-50`}
        />
        {/* Button to collapse the menu */}
        <XMarkIcon
          className={`
                  ${isMenuOpen ? 'duration-100' : 'opacity-0'}
                  transition-all delay-200 duration-300 
                  absolute h-8 w-8 fill-gray-50`}
        />
      </button>

      <div
        className={clsx(
          'fixed inset-0 z-40 bg-black transition-all duration-300',
          {
            'translate-x-0 opacity-100': isMenuOpen,
            'translate-x-full': !isMenuOpen,
          },
        )}
      >
        <div className="fixed inset-x-0 bottom-0 p-4 text-lg">
          <LoginModalButton />
        </div>

        <div className="flex flex-col h-full mt-20 flex-grow overflow-y-auto border-t border-gray-800 divide-y divide-gray-800">
          {renderLinks()}
          {/* {(() => {
            if (isLoggedIn) {
              return ( */}
          <>
            <MobileMenuItem
              menuItem={{
                Target: 'self',
                Label: 'Dashboard',
                Links: null,
                Url: '/dashboard',
              }}
            />
            <NestedMenuItems
              parentMenuItem={{
                Target: 'self',
                Label: 'Create',
                Links: [
                  {
                    Label: 'Create Collection',
                    Url: '/create?step=create-collection',
                    Target: 'self',
                    Links: null,
                  },
                  {
                    Label: 'Activate Collection',
                    Url: '/create?step=activate-collection',
                    Target: 'self',
                    Links: null,
                  },
                  {
                    Label: 'Create NFT',
                    Url: '/create?step=create-nft',
                    Target: 'self',
                    Links: null,
                  },
                ],
                Url: '/create',
              }}
              onMenuItemClick={toggleMenu}
              key={'Create Collections'}
            />
          </>
          {/* );
            }
          })()} */}
          <MobileLanguageMenu />
        </div>
      </div>
    </>
  );
};
