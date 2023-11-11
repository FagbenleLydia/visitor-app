import ArrowNext from "@/assets/svg/arrow-next";
import ArrowPrev from "@/assets/svg/arrow-prev";
import { DOTS, usePaginationL } from "@/hooks/usePaginationL";

interface pageProps {
  onPageChange: any;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  className?: string;
}
const Pagination = (props: pageProps) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePaginationL({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });


  if (currentPage === 0 || (paginationRange && paginationRange.length < 1)) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage =
    paginationRange && paginationRange[paginationRange.length - 1];



  return (
    <ul className="flex list-none justify-end w-full">
      <li
        className={`py-0 px-3 h-[44px] w-[44px] rounded-[4px] transition text-center my-auto mx-1 text-gray-700 flex box-border items-center justify-center tracking-[0.01071em] leading-[1.43] text-[13px] min-w-[32px] ${
          currentPage === 1
            ? "hidden"
            : "hover:cursor-pointer hover:bg-[#202020]/10 active:bg-[#202020]/[0.15]"
        }`}
        onClick={onPrevious}
      >
        <ArrowPrev />
      </li>
      {paginationRange &&
        paginationRange.map((pageNumber, i) => {
          if (pageNumber === DOTS) {
            return (
              <li
                key={i}
                className="py-0 px-3 h-[24px] w-[24px] transition rounded-[4px] text-center my-auto mx-1 text-gray-700 flex box-border items-center justify-center tracking-[0.01071em] leading-[1.43] text-[13px] min-w-[32px] hover:bg-transparent hover:cursor-default"
              >
                &#8230;
              </li>
            );
          }

          return (
            <li
              key={i}
              className={`py-0 px-3 h-[40px] w-[40px] transition rounded-[4px] text-center my-auto mx-1 flex box-border items-center justify-center tracking-[0.01071em] leading-[1.43] text-[13px] min-w-[32px] ${
                pageNumber === currentPage
                  ? `bg-[black] text-[#fff]`
                  : "text-gray-700 hover:bg-[#202020]/10 active:bg-[#202020]/[0.15]"
              } cursor-pointer bg-[rgba(0, 0, 0, 0.04)]`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}
      <li
        className={`py-0 px-3 h-[44px] w-[44px] rounded-[4px] text-center my-auto mx-1 text-gray-700 flex box-border items-center justify-center tracking-[0.01071em] leading-[1.43] text-[13px] min-w-[32px] ${
          currentPage === lastPage
            ? "hidden"
            : "hover:cursor-pointer hover:bg-[#202020]/10 active:bg-[#202020]/[0.15]"
        } `}
        onClick={onNext}
      >
        <ArrowNext />
      </li>
    </ul>
  );
};

export default Pagination;
