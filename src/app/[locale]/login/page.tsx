import React from 'react';
import Link from 'next/link';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { LoginMethods } from './_components/loginmethods';

export default function Page() {
  return (
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
        <LoginMethods />
      </div>
    </div>
  );
}
