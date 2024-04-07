'use client';
import { Menu } from '@headlessui/react';
import { DropdownMenu } from '@/app/_components/Layout/DrodpownMenu';
import { useLocale } from 'use-intl';
import { localesList } from '@/i18n';
import { useRouter, usePathname } from '@/app/_lib/i18nNavigation';
import { GB, FR } from 'country-flag-icons/react/3x2';

export const LanguageMenu = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleChange = (locale: string) => {
    router.push(pathname, { locale });
    router.refresh();
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
    <DropdownMenu
      title={
        <div className="flex items-center gap-x-2">
          {currLangFlag}
          {currLangFullName}
        </div>
      }
      classNameCustom="text-base rounded-full border border-gray-800 px-3 py-2 -ml-2"
    >
      <div className="flex flex-col">
        {localesList.map((locale) => {
          return (
            <button
              key={locale + '-desktop-language-item'}
              className="hover:text-colr-ghostverse-teal cursor-pointer rounded-lg p-2 px-4 w-full"
              onClick={() => handleChange(locale)}
            >
              <Menu.Item>
                <div className="flex items-center gap-x-2">
                  {(() => {
                    switch (locale) {
                      case 'fr':
                        return <FR className="w-6 h-4 rounded-sm" />;
                      default:
                        return <GB className="w-6 h-4 rounded-sm" />;
                    }
                  })()}
                  <a className="hover:text-colr-ghostverse-teal flex items-center justify-center text-base ">
                    {(() => {
                      switch (locale) {
                        case 'fr':
                          return <>{'Français'}</>;
                        default:
                          return <>{'English'}</>;
                      }
                    })()}
                  </a>
                </div>
              </Menu.Item>
            </button>
          );
        })}
      </div>
    </DropdownMenu>
  ) : null;
};
