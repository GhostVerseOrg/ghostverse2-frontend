import { ReactNode } from 'react';
import Link from 'next/link';

type Props = {
  href: string;
  testId?: string;
  label: string;
  children: ReactNode;
};

export const SocialLink = ({ children, testId, href, label }: Props) => {
  if (!href) {
    return null;
  }

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={testId}
      className="flex flex-wrap items-center justify-center hover:text-gray-200 group duration-300 hover:scale-105 hover:-translate-y-1"
    >
      <span className="">{label}</span>
      {children}
    </Link>
  );
};
