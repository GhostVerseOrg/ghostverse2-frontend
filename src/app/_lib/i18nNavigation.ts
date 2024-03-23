import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { localePrefix, localesList } from '@/i18n';

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({
    locales: localesList,
    localePrefix: localePrefix,
  });
