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

  const flagCode = locale.toUpperCase() || 'EN';

  return localesList.length > 1 ? (
    <DropdownMenu
      title={
        <div className="flex items-center gap-x-2">
          {(() => {
            switch (flagCode) {
              case 'FR':
                return <FR className="w-6 h-4" />;
              default:
                return <GB className="w-6 h-4" />;
            }
          })()}
          {flagCode}
        </div>
      }
      classNameCustom="text-lg"
    >
      {localesList.map((locale) => {
        return (
          <button
            key={locale + '-desktop-language-item'}
            className="hover:bg-gray-300 cursor-pointer rounded-lg p-2 px-4 w-full"
            onClick={() => handleChange(locale)}
          >
            <Menu.Item>
              <div className="flex items-center gap-x-2">
                {(() => {
                  switch (locale.toUpperCase()) {
                    case 'FR':
                      return <FR className="w-6 h-4" />;
                    default:
                      return <GB className="w-6 h-4" />;
                  }
                })()}
                <a className="text-gray-800 flex items-center justify-center text-base font-bold uppercase">
                  {locale}
                </a>
              </div>
            </Menu.Item>
          </button>
        );
      })}
    </DropdownMenu>
  ) : null;
};
