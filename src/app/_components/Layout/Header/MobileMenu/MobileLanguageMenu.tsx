'use client';
import React, { useState } from 'react';
import { useTranslations, useLocale } from 'use-intl';
import { localesList } from '@/i18n';
import { useRouter, usePathname } from '@/app/_lib/i18nNavigation';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { GB, FR } from 'country-flag-icons/react/3x2';

export const MobileLanguageMenu = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const t = useTranslations();

  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleChange = (locale: string) => {
    router.push(pathname, { locale });
    router.refresh();
  };

  const toggleMenu = () => {
    setIsMenuVisible((prevState) => !prevState);
  };

  // Move logic away from JSX if possible, this is the 'current' language part of selector logic.
  var currLangFullName;
  var currLangFlag;
  switch (locale) {
    case 'fr':
      currLangFullName = 'Français';
      currLangFlag = <FR className="w-6 h-4 rounded-sm" />;
      break;
    default:
      currLangFullName = 'English';
      currLangFlag = <GB className="w-6 h-4 rounded-sm" />;
      break;
  }

  return localesList.length > 1 ? (
    <div>
      <button
        className="flex text-interface-800 flex-row items-center w-full px-4 py-2 text-lg"
        onClick={toggleMenu}
      >
        <div className="flex items-center gap-x-2">
          {currLangFullName}
          {currLangFlag}
        </div>

        <ChevronRightIcon
          className={`-mr-1 ml-2 h-5 w-5 transition-transform stroke-[3px] ${
            isMenuVisible && '-rotate-90'
          }`}
        />
      </button>

      <div
        className={`ml-8 transition-all duration-300 overflow-hidden w-full flex flex-col gap-y-4  ${
          isMenuVisible ? 'h-[75px] pt-1' : 'h-0'
        }`}
      >
        {(() => {
          let fragments: any = [];
          localesList!.forEach((locale, index, array) => {
            fragments.push(
              <button
                key={locale + '-mobile-language-item'}
                onClick={() => handleChange(locale)}
                className="flex font-base  items-center text-interface-800 uppercase text-lg"
              >
                {(() => {
                  switch (locale) {
                    case 'fr':
                      return (
                        <div className="flex items-center gap-x-2 capitalize">
                          <FR className="w-6 h-4 rounded-sm" />
                          {'Français'}
                        </div>
                      );
                    default:
                      return (
                        <div className="flex items-center gap-x-2 capitalize">
                          <GB className="w-6 h-4 rounded-sm" />
                          {'English'}
                        </div>
                      );
                  }
                })()}
              </button>,
            );
          });

          return fragments;
        })()}
      </div>
    </div>
  ) : null;
};
