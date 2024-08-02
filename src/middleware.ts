import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { localePrefix, localesList } from '@/i18n';

const nextIntlMiddleware = createMiddleware({
  // Our app's supported locales. We can have as many as we want.
  locales: localesList,

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`).
  defaultLocale: 'en',

  // Always put the language prefix to URL.
  localePrefix: localePrefix,
});

// eslint-disable-next-line import/no-anonymous-default-export
export default function (req: NextRequest): NextResponse {
  return nextIntlMiddleware(req);
}

export const config = {
  // Fix for redirects to unprefixed pathnames, e.g., /login.
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
