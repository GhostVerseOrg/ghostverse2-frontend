'use client';
import { Menu } from '@headlessui/react';
import { DropdownMenu } from '@/app/_components/Layout/DrodpownMenu';
import { useLocale } from 'use-intl';
import { localesList } from '@/i18n';
import { useRouter, usePathname } from '@/app/_lib/i18nNavigation';

export const LanguageMenu = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleChange = (locale: string) => {
    router.push(pathname, { locale });
    router.refresh();
  };

  return localesList.length > 1 ? (
    <DropdownMenu
      title={locale.toUpperCase() || 'EN'}
      classNameCustom="text-lg"
    >
      {localesList.map((locale) => {
        return (
          <button
            key={locale + '-desktop-language-item'}
            onClick={() => handleChange(locale)}
          >
            <Menu.Item>
              <a className="hover:bg-gray-300 text-gray-800 cursor-pointer flex items-center justify-center rounded-lg p-2 px-4 text-base font-bold uppercase">
                {locale}
              </a>
            </Menu.Item>
          </button>
        );
      })}
    </DropdownMenu>
  ) : null;
};
