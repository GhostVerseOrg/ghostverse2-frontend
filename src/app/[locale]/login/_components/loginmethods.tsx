'use client';
import { useEffect } from 'react';
import { useLogin } from '@useelven/core';
import { LoginComponent } from '@/app/_components/port/useElvenDapp/elven-ui/login-component';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

export const LoginMethods = () => {
  const { isLoggedIn } = useLogin();
  const router = useRouter();

  useEffect(() => {
    const redirectPath = new URLSearchParams(window.location.search).get(
      'route',
    );

    if (isLoggedIn && redirectPath == '') {
      router.push('/');
    }
  }, [isLoggedIn]);

  return (
    <div className="max-w-xs sm:max-w-lg fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] border bg-login-modal-background border-white/30 sm:rounded-lg md:w-full">
      <div className="max-w-xs sm:max-w-lg text-login-modal-text gap-4 grid">
        <div
          className="
      flex justify-center gap-2
      px-6 pt-6 
      text-xl tracking-tight text-white/85"
        >
          <p className="font-cubic12">Connect to </p>
          <p className="font-cubic12">GhostVerse</p>
        </div>
        <a
          href="/"
          className="items-center flex absolute h-7 w-7 rounded-md hover:bg-gray-600/40 right-4 top-4 ring-offset-background transition-opacity"
        >
          <X size="16" className="m-auto" />
          <span className="sr-only">Close</span>
        </a>
        <div className="grid gap-4 overflow-y-auto max-h-[calc(100vh-160px)] px-6 pb-12 pt-3">
          <LoginComponent />
        </div>
      </div>
    </div>
  );
};
