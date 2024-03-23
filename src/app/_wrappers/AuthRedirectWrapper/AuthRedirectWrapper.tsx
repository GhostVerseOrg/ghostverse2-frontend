'use client';
import { useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import { redirect } from 'next/navigation';
import { useGetIsLoggedIn } from '@/app/_hooks';
import { RouteNamesEnum } from '@/app/_constants/routes';

interface AuthRedirectWrapperPropsType extends PropsWithChildren {
  requireAuth?: boolean;
}

export const AuthRedirectWrapper = ({
  children,
  requireAuth = true,
}: AuthRedirectWrapperPropsType) => {
  const isLoggedIn = useGetIsLoggedIn();

  useEffect(() => {
    // if (isLoggedIn && !requireAuth) {
    //   redirect(RouteNamesEnum.dashboard);
    // }

    if (!isLoggedIn && requireAuth) {
      redirect(RouteNamesEnum.unlock);
    }
  }, [isLoggedIn, requireAuth]);

  return <>{children}</>;
};
