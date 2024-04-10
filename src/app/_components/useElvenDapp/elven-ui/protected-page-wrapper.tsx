'use client';

import { useEffect, PropsWithChildren, FC } from 'react';
import { useRouter } from 'next/navigation';
import { useLogin } from '@useelven/core';
import { Spinner } from '../ui/spinner';
import { Layout } from '../../Layout/Layout/Layout';

interface ProtectedPageWrapper {
  redirectPath?: string;
}

export const ProtectedPageWrapper: FC<
  PropsWithChildren<ProtectedPageWrapper>
> = ({ children, redirectPath = '/' }) => {
  const router = useRouter();
  const { isLoggedIn, isLoggingIn } = useLogin();

  useEffect(() => {
    if (!isLoggingIn && !isLoggedIn) {
      router.push(redirectPath);
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
