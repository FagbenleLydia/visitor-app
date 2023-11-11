import { useEffect, useState } from "react";

const usePagination = (_page?: number) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    if (_page) {
      setPage(_page);
    }
  }, [_page]);

  return {
    page,
    pageSize,
    setPageSize,
    setPage,
  };
};

export default usePagination;
