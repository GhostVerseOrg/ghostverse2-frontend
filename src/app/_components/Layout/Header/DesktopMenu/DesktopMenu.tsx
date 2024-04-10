'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { MenuElement } from '@/app/_lib/api/MenuApi';
import { getMenuItemKey } from '@/app/_components/Layout/Header/_utils/getMenuItemKey';
import { v4 as uuidv4 } from 'uuid';
import { NestedMenuItems } from '@/app/_components/Layout/Header/DesktopMenu/NestedMenuItems';
import { LanguageMenu } from '@/app/_components/Layout/Header/DesktopMenu/LanguageMenu';
import Image from 'next/image';
import { Button } from '../../../Button';
import { useLogin, useLogout } from '@useelven/core';
import Link from 'next/link';
import { DesktopMenuItem } from '@/app/_components/Layout/Header/DesktopMenu/MenuItem';
import TealGradientButton from '@/app/_components/Button/TealGradientButton';

type Props = {
  menuItems: MenuElement[];
};

export const DesktopMenu = ({ menuItems }: Props) => {
  const router = useRouter();
  const { login, isLoggedIn, error } = useLogin();
  const { logout } = useLogout();

  const onRedirect = () => {
    router.replace('/');
  };

  const handleLogout = () => {
    sessionStorage.clear();
    logout();
    onRedirect();
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
        />
      );
    });
  };

  return (
    <>
      <Link href="/" className="shrink-0 flex items-center">
        {/* Wrapper div for applying custom styles */}
        <div className="inline-block min-w-[150px]">
          <Image
            src="/assets/img/logo-ghostverse.png"
            alt="GhostVerse"
            width={200}
            height={40}
            priority
          />
        </div>
      </Link>

      <div className="flex items-center gap-10 justify-start m-auto">
        {renderLinks()}
      </div>

      <div className="flex items-center gap-5 ml-10">
        <div className="inline-flex items-center font-medium text-colr-d-btn text-base">
          {isLoggedIn ? (
            <Button
              onClick={handleLogout}
              className="
              p-3 m-2 rounded-full shadow-sm duration-200 bg-colr-ghostverse-teal transition-colors
              hover:bg-colr-d-btn 
              focus:ring-colr-ghostverse-teal focus:outline-none focus:ring-2 focus:ring-offset-2
                "
            >
              Logout
            </Button>
          ) : (
            <TealGradientButton href={'/unlock'} text="Connect" />
          )}
        </div>
        <LanguageMenu />
      </div>
    </>
  );
};
