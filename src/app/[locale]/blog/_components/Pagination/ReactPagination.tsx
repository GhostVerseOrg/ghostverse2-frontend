import ReactPaginate from 'react-paginate';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';

type Props = {
  total: number;
  initialPage: number;
  onPageChange: (page: number) => void;
};

export const ReactPagination = ({
  total,
  initialPage,
  onPageChange,
}: Props) => {
  const pageCount = Math.ceil(total / 6);

  const handlePageClick = ({ selected }: { selected: number }) => {
    onPageChange(selected);
  };

  const positionClasses = 'flex items-center justify-center';
  const sizeClasses = 'w-10 h-10';
  const baseBgAndTextClasses =
    'font-medium text-sm text-gray-200 bg-slate-700 hover:bg-slate-500';
  const baseBorderClasses = 'border border-gray-800 rounded-md';
  const buttonClasses = 'w-full h-full flex items-center justify-center';

  const commonClasses = `${positionClasses} ${sizeClasses} ${baseBgAndTextClasses} ${baseBorderClasses}`;

  return (
    <ReactPaginate
      containerClassName="inline-flex gap-2"
      initialPage={initialPage}
      onPageChange={handlePageClick}
      pageCount={pageCount}
      pageRangeDisplayed={5}
      pageClassName={commonClasses}
      pageLinkClassName={buttonClasses}
      activeClassName="!bg-gray-500 hover:bg-gray-500"
      previousLabel={<ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />}
      previousAriaLabel="previous"
      previousClassName={commonClasses}
      previousLinkClassName={buttonClasses}
      nextLabel={<ChevronRightIcon className="h-5 w-5" aria-hidden="true" />}
      nextAriaLabel="next"
      nextClassName={commonClasses}
      nextLinkClassName={buttonClasses}
      breakLabel="..."
      breakClassName={commonClasses}
      breakLinkClassName={buttonClasses}
    />
  );
};
