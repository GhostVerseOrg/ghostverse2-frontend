import React from 'react';
import { AuthRedirectWrapper } from '@/app/_wrappers/AuthRedirectWrapper';
import { LoginMethods } from './_components/loginmethods';
import Link from 'next/link';

export default function Page() {
  return (
    <AuthRedirectWrapper requireAuth={false}>
      <div className="flex justify-center items-center h-screen bg-colr-d-bg">
        <Link
          href="/"
          className="absolute top-10 right-10 text-colr-mvx-teal text-4xl"
        >
          x
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
