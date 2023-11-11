import { Table, Empty } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { GetRowKey } from "antd/es/table/interface";
import ArrowPrev from "@/assets/svg/arrow-prev";
import ArrowNext from "@/assets/svg/arrow-next";
import Pagination from "./Pagination";

type TableProps = {
  columns: any;
  data: any;
  total: number;
  setPageSize: (pageSize: number) => void;
  pageSize: number;
  setPage: (page: number) => void;
  page: number;
  pagination?: boolean;
  header?: boolean;
  description?: string;
  loading?: boolean;
  count?: number;
  rowkey?: string | GetRowKey<any>;
  onRow?: any;
  asQuery?: boolean;
  rowClassName?: string;
  generalClassName?: string;
};

type PaginationType = "prev" | "next" | "page" | "jump-prev" | "jump-next";

const CustomTable = ({
  columns,
  data,
  pagination,
  page,
  pageSize,
  setPageSize,
  setPage,
  total,
  description,
  loading,
  count,
  rowkey,
  onRow,
  asQuery = true,
  rowClassName = "font-light text-sm",
  generalClassName = "h-full min-h-[300px] !table-fixed w-full",
}: TableProps) => {
  const [activePage, setActivePage] = useState<number | null>(page);

  useEffect(() => {
    setActivePage(page);
  }, [page]);

  let locale = {
    emptyText: (
      <Empty
        image={
          <Image
            src="/assets/png/empty-data.png"
            alt="empty"
            width={64}
            height={64}
          />
        }
        imageStyle={{
          height: 64,
        }}
        className="flex flex-col items-center justify-center min-h-[300px]"
        description={
          <span className=" font-medium text-[16px] leading-[150%] text-placeholder-gray">
            {description}
          </span>
        }
      />
    ),
  };

  const itemRender = (
    page: number,
    type: PaginationType,
    originalElement: React.ReactNode
  ) => {
    return (
      <>
        {type === "prev" && (
          <div className="flex w-full items-center font-medium text-[14px] leading-5 text-[#667085]">
            <span className="mr-[12px]">
              <ArrowPrev />
            </span>
            Previous
          </div>
        )}

        {type === "page" && (
          <>
            <div
              className={`flex items-center justify-center w-full h-full ${
                page === activePage ? "bg-purple-tone rounded-lg" : ""
              }`}
            >
              <span
                className={`inline-block font-medium text-[14px]  ${
                  activePage === page
                    ? "text-pos-blue min-w-[80px]"
                    : "text-[#667085]"
                }`}
              >
                {page === activePage ? `Page ${page}` : page}
              </span>
            </div>
          </>
        )}

        {type === "jump-prev" && <span className="">...</span>}
        {type === "jump-next" && <span className="">...</span>}

        {type === "next" && (
          <div className="flex w-full items-center justify-end font-medium text-[14px] leading-5 text-[#667085]">
            Next
            <span className="ml-[12px]">
              <ArrowNext />
            </span>
          </div>
        )}
      </>
    );
  };


  return (
    <div className="overflow-x-auto ">
      <div className="flex-1">
        <Table
          loading={loading}
          columns={columns}
          dataSource={data}
          scroll={{
            scrollToFirstRowOnChange: true,
          }}
          pagination={false}
          locale={locale}
          size="large"
          showHeader={true}
          bordered={false}
          rowClassName={rowClassName}
          className={generalClassName}
          rowKey={rowkey}
          onRow={onRow}
        />
      </div>

      {pagination && (
        <div className="w-full bg-white mt-8 flex justify-end">
          <Pagination
            currentPage={page || 1}
            totalCount={total}
            pageSize={pageSize}
            onPageChange={(page: number) => setPage && setPage(page)}
          />
        </div>
      )}
    </div>
  );
};

export default CustomTable;
