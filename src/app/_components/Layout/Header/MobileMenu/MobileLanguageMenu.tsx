'use client';
import React, { Suspense, useState } from 'react';
import { useTranslations } from 'use-intl';
import { localesList } from '@/i18n';
import { useRouter, usePathname } from '@/app/_lib/i18nNavigation';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

export const MobileLanguageMenu = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (locale: string) => {
    router.push(pathname, { locale });
    router.refresh();
  };

  const toggleMenu = () => {
    setIsMenuVisible((prevState) => !prevState);
  };

  return localesList.length > 1 ? (
    <div>
      <button
        className="font-base flex font-medium text-lg text-interface-800 flex-row items-center w-full h-16"
        onClick={toggleMenu}
      >
        {t('changeLanguage')}

        <ChevronRightIcon
          className={`-mr-1 ml-2 h-5 w-5 transition-transform stroke-[3px] ${
            isMenuVisible && '-rotate-90'
          }`}
        />
      </button>

      <Suspense>
        <div
          className={`ml-5 transition-all duration-300 overflow-hidden w-full flex flex-col  ${
            isMenuVisible ? 'h-[100px]' : 'h-0'
          }`}
        >
          {(() => {
            let fragments: any = [];

            // Iterate for every language we have specified.
            localesList!.forEach((locale, index, array) => {
              // If this is not the last item, print language with bottom horizontal line and space.
              fragments.push(
                <button
                  key={locale + '-mobile-language-item'}
                  onClick={() => handleChange(locale)}
                  className="flex font-base font-medium text-interface-800 uppercase text-lg h-16 items-start"
                >
                  {locale}
                </button>,
              );
            });

            return fragments;
          })()}
        </div>
      </Suspense>
    </div>
  ) : null;
};
