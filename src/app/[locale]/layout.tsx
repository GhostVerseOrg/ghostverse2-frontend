import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import localFont from 'next/font/local';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import React from 'react';
import { localesList } from '@/i18n';
import DebugBreakpoint from '../_components/DevTools/DebugBreakpoint';
import { ElvenInit } from '../_components/port/useElvenDapp/elven-ui/elven-init';

const inter = Inter({ subsets: ['latin'] });

// https://nextjs.org/docs/app/building-your-application/optimizing/fonts#local-fonts
const cubic10 = localFont({
  src: [
    {
      path: '../../../public/assets/fonts/cubicfive10.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--cubic-10',
});

const cubic12 = localFont({
  src: [
    {
      path: '../../../public/assets/fonts/cubicfive12.woff2',
      weight: '700',
      style: 'bold',
    },
  ],
  variable: '--cubic-12',
});

export function generateStaticParams() {
  return localesList.map((locale) => ({ locale }));
}

// @ts-ignore
export default async function LocaleLayout({ children, params: { locale } }) {
  unstable_setRequestLocale(locale);

  const messages = await getMessages(locale);

  return (
    <html lang={locale} className={`${cubic10.variable} ${cubic12.variable}`}>
      <body className={inter.className}>
        <ElvenInit />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <DebugBreakpoint />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
