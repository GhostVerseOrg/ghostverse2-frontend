'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { usePathname } from '@/app/_lib/i18nNavigation';
import { ReactPagination } from '@/app/[locale]/blog/_components/Pagination/ReactPagination';

export const BlogPaginationHandler = (params: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let currentPageInitial = searchParams.get('page') || 1;

  const handlePageChange = async (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    let currentPage = searchParams.get('page') || 0;

    // Take into account internal logic that handles pages indexes starting from 0,
    // but we display them starting from 1 so we append 1.
    if (Number(currentPage) > 0) {
      params.set('page', (Number(page) + 1).toString());
      router.push(pathname + '?' + params.toString());
    } else {
      params.set('page', '1');
      router.push(pathname + '?' + params.toString());
    }
  };

  return (
    <div className="mt-20 flex justify-center">
      <ReactPagination
        initialPage={Number(currentPageInitial) - 1}
        total={params.blogsData.total}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
