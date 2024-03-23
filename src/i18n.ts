import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
export const localesList = ['en', 'fr'];

export const localePrefix = 'as-needed';

// Create this configuration once per request and
// make it available to all Server Components.
export default getRequestConfig(async ({ locale }) => {
  if (!localesList.includes(locale)) notFound();

  return {
    // Load translations for the active locale.
    messages: (await import(`../public/translations/${locale}/${locale}.json`))
      .default,
  };
});
