import React from 'react';
import { AuthRedirectWrapper } from '@/app/_wrappers/AuthRedirectWrapper';
import { LoginMethods } from './_components/loginmethods';
import Link from 'next/link';
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function Page() {
  return (
    <AuthRedirectWrapper requireAuth={false}>
      <div className="flex justify-center items-center h-screen bg-colr-d-bg">
        <Link
          href="/"
          className="absolute top-10 right-10 text-white text-4xl p-2 inline-flex w-12 h-12 items-center justify-center bg-colr-ghostverse-teal rounded-full z-50"
        >
          <XMarkIcon />
        </Link>
        <div
          className="flex flex-col p-6 items-center justify-center gap-4 rounded-xl bg-colr-d-bg"
          data-testid="unlockPage"
        >
          <div className="flex flex-col items-center gap-1">
            <h2 className="text-2xl text-colr-d-fg">Login</h2>
            <p className="text-center text-colr-l-fg">Choose a login method</p>
          </div>

          <LoginMethods />
        </div>
      </div>
    </AuthRedirectWrapper>
  );
}
