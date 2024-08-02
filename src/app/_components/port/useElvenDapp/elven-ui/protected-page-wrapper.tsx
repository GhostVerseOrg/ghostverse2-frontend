'use client';

import { useEffect, PropsWithChildren, FC } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLogin } from '@useelven/core';
import { Layout } from '../../../Layout/Layout/Layout';

interface ProtectedPageWrapper {
  redirectPath?: string;
  searchParams?: any;
}

export const ProtectedPageWrapper: FC<
  PropsWithChildren<ProtectedPageWrapper>
> = ({ children, redirectPath = '/login', searchParams }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, isLoggingIn } = useLogin();

  const params = new URLSearchParams(searchParams);

  useEffect(() => {
    if (!isLoggingIn && !isLoggedIn) {
      params.set('route', pathname);
      router.push(redirectPath + '?' + params.toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, isLoggingIn]);

  if (isLoggingIn) {
    return (
      <div className="flex-1 flex-row items-center justify-center h-screen w-screen bg-colr-d-bg">
        <Layout
          // @ts-ignore
          menuItems={null}
          classNameCustom="bg-white px-5 bg-colr-d-bg text-gray-100"
        >
          <div className="w-full min-w-full">
            <header className="py-14 lg:py-20">
              <div className="m-auto max-w-[1280px]"></div>
            </header>
          </div>
        </Layout>
      </div>
    );
  }

  if (!isLoggingIn && !isLoggedIn) {
    return null;
  }

  return <>{children}</>;
};
