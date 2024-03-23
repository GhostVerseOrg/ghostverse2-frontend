import { Fragment } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/16/solid';

type BreadcrumbsData = {
  link: string;
  label: string;
  isActive: boolean;
};

type Props = {
  breadcrumbs: BreadcrumbsData[];
};

export const Breadcrumbs = ({ breadcrumbs }: Props) => {
  return (
    <nav className="flex items-center font-normal">
      {breadcrumbs.map((breadcrumb, index) => (
        <Fragment key={breadcrumb.link}>
          <Link
            href={breadcrumb.link}
            className={clsx('text-base md:text-lg', {
              'text-gray-400 hover:scale-105 duration-200':
                !breadcrumb.isActive,
              'text-gray-300 cursor-text': breadcrumb.isActive,
            })}
          >
            {breadcrumbs.length !== index + 1 ? (
              <span>{breadcrumb.label}</span>
            ) : (
              <span className="line-clamp-1">{breadcrumb.label}</span>
            )}
          </Link>

          {breadcrumbs.length !== index + 1 && (
            <span className="mx-1 gray-500 text-gray-500">
              <ChevronRightIcon width="18px" />
            </span>
          )}
        </Fragment>
      ))}
    </nav>
  );
};
