import type { ReactNode } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

type Props = {
  children: ReactNode;
  classNameCustom?: string;
};

export const PageWrapper = ({ children, classNameCustom }: Props) => {
  return (
    <div className={twMerge(clsx('lg:px-24', classNameCustom))}>{children}</div>
  );
};
