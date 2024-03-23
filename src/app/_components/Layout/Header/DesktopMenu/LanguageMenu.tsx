'use client';
import { Menu } from '@headlessui/react';
import { DropdownMenu } from '@/app/_components/Layout/DrodpownMenu';
import { useLocale } from 'use-intl';
import { localesList } from '@/i18n';
import { useRouter, usePathname } from '@/app/_lib/i18nNavigation';

export const LanguageMenu = async () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleChange = (locale: string) => {
    router.push(pathname, { locale });
    router.refresh();
  };

  return localesList.length > 1 ? (
    // TODO: set current language as first option there.
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
              {({ active }) => (
                <a
                  className={`${
                    active ? 'bg-gray-300' : ''
                  } text-gray-800 cursor-pointer flex items-center justify-center rounded-lg
                   p-2 px-4 text-base font-bold uppercase`}
                >
                  {locale}
                </a>
              )}
            </Menu.Item>
          </button>
        );
      })}
    </DropdownMenu>
  ) : null;
};
