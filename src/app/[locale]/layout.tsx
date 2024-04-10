import { Inter } from 'next/font/google';
import '@/styles/globals.css';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import React from 'react';
import { localesList } from '@/i18n';
import DebugBreakpoint from '../_components/DevTools/DebugBreakpoint';

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
  return localesList.map((locale) => ({ locale }));
}

// @ts-ignore
export default async function LocaleLayout({ children, params: { locale } }) {
  unstable_setRequestLocale(locale);

  const messages = await getMessages(locale);

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <DebugBreakpoint />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
