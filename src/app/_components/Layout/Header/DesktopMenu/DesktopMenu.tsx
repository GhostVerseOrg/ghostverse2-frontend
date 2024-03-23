'use client';
import React, { Suspense } from 'react';
import { useGetIsLoggedIn } from '@/app/_hooks';
import { getWindowLocation, logout } from '@multiversx/sdk-dapp/utils';
import { RouteNamesEnum } from '@/app/_constants/routes';
import { useRouter } from 'next/navigation';
import { MenuElement } from '@/app/_lib/api/MenuApi';
import { getMenuItemKey } from '@/app/_components/Layout/Header/_utils/getMenuItemKey';
import { v4 as uuidv4 } from 'uuid';
import { NestedMenuItems } from '@/app/_components/Layout/Header/DesktopMenu/NestedMenuItems';
import { LanguageMenu } from '@/app/_components/Layout/Header/DesktopMenu/LanguageMenu';
import Image from 'next/image';
import { Button } from '../../../Button';
import Link from 'next/link';
import { DesktopMenuItem } from '@/app/_components/Layout/Header/DesktopMenu/MenuItem';
import TealGradientButton from '@/app/_components/Button/TealButton';

type Props = {
  menuItems: MenuElement[];
};

export const DesktopMenu = ({ menuItems }: Props) => {
  const router = useRouter();
  const isLoggedIn = useGetIsLoggedIn();

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
          />
        );
      }

      if (!item.Url) {
        return null;
      }

      return (
        <DesktopMenuItem
          menuItem={item}
          key={getMenuItemKey(item) + uuidv4()}
        ></DesktopMenuItem>
      );
    });
  };

  return (
    <div className="flex w-full justify-between items-center p-3 lg:px-16 bg-black">
      <div>
        <Link href="/" className="shrink-0 flex items-center ">
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

      <div className="flex items-center gap-10 max-w-[1250px] justify-start w-full ml-10">
        {renderLinks()}
      </div>

      <div className="flex items-center gap-5">
        {/* Client-only component, wrap in Suspense to not break server build, stop client context at this point */}
        <Suspense>
          <LanguageMenu />
        </Suspense>
        <div className="inline-flex items-center font-medium text-colr-d-btn text-base">
          {isLoggedIn ? (
            <Button
              onClick={handleLogout}
              className="
              p-3 m-2 rounded-md shadow-sm hover:text-colr-mvx-teal duration-200 bg-colr-mvx-teal transition-colors
              hover:bg-colr-d-btn 
              focus:ring-colr-mvx-teal focus:outline-none focus:ring-2 focus:ring-offset-2
                "
            >
              Close
            </Button>
          ) : (
            <TealGradientButton href={RouteNamesEnum.unlock} text="Connect" />
          )}
        </div>
      </div>
    </div>
  );
};
