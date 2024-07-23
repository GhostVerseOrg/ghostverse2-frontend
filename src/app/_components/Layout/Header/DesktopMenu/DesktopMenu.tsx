'use client';
import React, { useEffect } from 'react';
import { MenuElement } from '@/app/_lib/api/MenuApi';
import { getMenuItemKey } from '@/app/_components/Layout/Header/_utils/getMenuItemKey';
import { v4 as uuidv4 } from 'uuid';
import { NestedMenuItems } from '@/app/_components/Layout/Header/DesktopMenu/NestedMenuItems';
import { LanguageMenu } from '@/app/_components/Layout/Header/DesktopMenu/LanguageMenu';
import Image from 'next/image';
import Link from 'next/link';
import { DesktopMenuItem } from '@/app/_components/Layout/Header/DesktopMenu/MenuItem';
import { LoginModalButton } from '@/app/_components/port/useElvenDapp/elven-ui/login-modal-button';
import { useLogin } from '@useelven/core';

type Props = {
  menuItems: MenuElement[];
};

export const DesktopMenu = ({ menuItems }: Props) => {
  const { isLoggedIn } = useLogin();

  const renderLinks = () => {
    return menuItems?.map((item) => {
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

      <div className="flex items-center md:gap-5 lg:gap-10 justify-start m-auto">
        {renderLinks()}

        {(() => {
          if (isLoggedIn) {
            return (
              <>
                <DesktopMenuItem
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
                  key={'Create Collections'}
                />
              </>
            );
          }
        })()}
      </div>

      <div className="flex items-center gap-5">
        <div className="inline-flex items-center font-medium text-colr-d-btn text-base">
          <LoginModalButton />
        </div>
        <LanguageMenu />
      </div>
    </>
  );
};
