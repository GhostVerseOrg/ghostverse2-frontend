import React, { Suspense } from 'react';
import { AuthRedirectWrapper } from '@/app/_wrappers/AuthRedirectWrapper';
import { LoginMethods } from './_components/loginmethods';

export default function Page() {
  return (
    <AuthRedirectWrapper requireAuth={false}>
      <div className="flex justify-center items-center">
        <div
          className="flex flex-col p-6 items-center justify-center gap-4 rounded-xl bg-[#f6f8fa]"
          data-testid="unlockPage"
        >
          <div className="flex flex-col items-center gap-1">
            <h2 className="text-2xl">Login</h2>

            <p className="text-center text-gray-400">Choose a login method</p>
          </div>

          <LoginMethods />
        </div>
      </div>
    </AuthRedirectWrapper>
  );
}
