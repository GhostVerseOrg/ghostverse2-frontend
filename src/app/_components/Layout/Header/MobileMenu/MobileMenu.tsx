'use client';
import { MobileMenuItem } from './MenuItem';
import { MobileLanguageMenu } from '@/app/_components/Layout/Header/MobileMenu/MobileLanguageMenu';
import { NestedMenuItems } from './NestedMenuItems';
import { getMenuItemKey } from '@/app/_components/Layout/Header/_utils/getMenuItemKey';
import { RouteNamesEnum } from '@/app/_constants/routes';
import { useGetIsLoggedIn } from '@/app/_hooks';
import clsx from 'clsx';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { MenuElement } from '@/app/_lib/api/MenuApi';
import { Button } from '../../../Button';
import { getWindowLocation, logout } from '@multiversx/sdk-dapp/utils';
import Link from 'next/link';
import GoldenGradientButton from '@/app/_components/Button/GoldenGradientButton';

type Props = {
  menuItems: MenuElement[];
};

export const MobileMenu = ({ menuItems }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();
  const isLoggedIn = useGetIsLoggedIn();

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const onRedirect = () => {
    router.replace(RouteNamesEnum.home);
  };

  const handleLogout = () => {
    const { href } = getWindowLocation();
    sessionStorage.clear();
    logout(href, onRedirect, false);
  };

  const renderLinks = () => {
    return menuItems.map((item) => {
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
          <div key={item.Url + uuidv4()} className="border-t border-gray-700">
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
      <div
        className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-black to-slate-900 text-white
      border-b border border-gray-800"
      >
        <div className="flex justify-between items-center w-full px-2">
          <div className="flex justify-between items-center w-full p-4 mx-0">
            <Link href="/" className="shrink-0 flex items-center">
              {/* Wrapper div for applying custom styles */}
              <span className="self-center font-russo-one-regular text-2xl font-extrabold whitespace-nowrap text-gray-200 px-1">
                MV
              </span>
              <div className="inline-block min-w-[50px]">
                <Image
                  src="/assets/img/mvx.svg"
                  alt="MvX Me Logo"
                  width={40}
                  height={40}
                  priority
                />
              </div>
              <span className="self-center font-russo-one-regular text-2xl font-extrabold whitespace-nowrap text-gray-200 -m-2">
                ME
              </span>
            </Link>
          </div>

          <button
            onClick={toggleMenu}
            className="p-2 relative inline-flex w-12 h-12 items-center justify-center"
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
        </div>
      </div>

      <div
        className={clsx(
          'fixed inset-0 z-40 bg-gray-800 text-white duration-[400ms] bg-gradient-to-t from-black to-slate-900 opacity-0',
          {
            'translate-x-0 opacity-100': isMenuOpen,
            'translate-x-full': !isMenuOpen,
          },
        )}
      >
        <div className="flex flex-col h-full pt-14">
          <div className="flex-grow overflow-y-auto p-4 pt-8">
            <MobileLanguageMenu />
            {renderLinks()}
          </div>
        </div>

        <div className="fixed inset-x-0 bottom-0 z-50 p-4 text-lg">
          {isLoggedIn ? (
            <Button
              onClick={handleLogout}
              className="w-full flex items-center justify-center p-3 m-2 rounded-md shadow-sm font-medium text-black bg-colr-d-btn hover:bg-colr-mvx-teal transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-colr-mvx-teal"
            >
              Sign Out
            </Button>
          ) : (
            <div className="flex justify-between">
              <GoldenGradientButton
                href={RouteNamesEnum.unlock}
                text="Connect"
              />
            </div>
          )}
        </div>
      </div>

      {/* Space after fixed-positioned header, absolute padding from top of screen */}
      <div className="pt-16" />
    </>
  );
};

// hover:scale-110 transition-transform duration-300 ease-in-out mr-5
