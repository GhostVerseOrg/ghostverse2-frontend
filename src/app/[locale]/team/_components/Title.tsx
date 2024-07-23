import React from 'react';
import { cn } from '@/app/_components/port/useElvenDapp/lib/utils';

type TitleProps = {
  title: string;
  className?: string;
};

export const TeamTitle: React.FC<TitleProps> = ({ title, className }) => {
  return (
    <h1
      className={cn(
        'text-lg mb-4 font-cubic12 lg:text-2xl font-black text-ghost-color2',
        className,
      )}
    >
      {title}
    </h1>
  );
};
