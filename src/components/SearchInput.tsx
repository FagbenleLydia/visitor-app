"use client";
import ArrowRight from "@/assets/svg/ArrowRight";
import Book from "@/assets/svg/Book";
import Bookmark from "@/assets/svg/Bookmark";
import Calender from "@/assets/svg/Calender";
import SearchIcon from "@/assets/svg/Search";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { Input } from "antd";
import { ConfigProvider } from "antd";
import React, { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import useStore from "@/store";

const SearchInput = ({
  classNames = "w-full rounded-xl h-[181px] max-h-[234px] pb-[14px] overflow-y-scroll top-13",
  placeholder = "Enter name of visitor here",
  existing = false,
  data,
  setName,
}: {
  classNames?: string;
  placeholder?: string;
  existing?: boolean;
  data: any;
  setName: Dispatch<SetStateAction<string>>;
}) => {
  const ref = React.useRef(null);
  const setVisitorDetail = useStore((state) => state.setVisitorDetail);
  const router = useRouter();
  const [show, setShow] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [actualvalue, setActualValue] = React.useState("");

  const handleClickOutside = () => {
    setShow(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  return (
    <div ref={ref} className="relative">
      <ConfigProvider
        theme={{
          token: {
            colorTextPlaceholder: "#AFAFAF",
          },
        }}
      >
        <Input
          onClick={() => setShow((prev) => !prev)}
          className={`h-[56px] ${
            existing ? "w-[533px]" : "w-full"
          }  rounded-xl text-[#1F1F1F] bg-[#F3F3F3]`}
          placeholder={placeholder}
          prefix={<SearchIcon />}
          onChange={handleChange}
        />
        {!existing && (
          <div
            onClick={() => {
              actualvalue !== "" && router.push("/book-entry");
            }}
            className={`absolute top-1 right-2 h-[48px] w-[64px] rounded-xl ${
              actualvalue !== ""
                ? "bg-[#6541D1] cursor-pointer"
                : "bg-[#A693DF]"
            }  flex justify-center items-center z-10`}
          >
            <ArrowRight />
          </div>
        )}
        {existing && (
          <div
            onClick={() => {
              actualvalue !== "" &&
                router.push(`/book-entry?email=${actualvalue}`);
            }}
            className={`absolute top-1 left-[480px] h-[48px] rounded-xl flex justify-center items-center z-10 cursor-pointer`}
          >
            <ArrowRight color="black" />
          </div>
        )}

        {show && (
          <div
            className={`${classNames} bg-white absolute left-0 z-10 pt-6 scrollbar-none`}
          >
            {data.length === 0 && (
              <p className="text-[18px] font-bold text-center mt-[30px">
                No Visitor found
              </p>
            )}
            {data.length > 0 &&
              data.map((item: any, i: number) => (
                <div
                  onClick={() => {
                    setActualValue(item.name);
                    setShow(!show);
                    setVisitorDetail(item);
                    router.push(`/book-entry?email=${actualvalue}`);
                  }}
                  className="flex items-center space-x-1 px-6 pb-8 hover:text-[#6541D1] cursor-pointer"
                  key={i}
                >
                  <span className="mr-1">
                    <Bookmark />
                  </span>{" "}
                  <span className=" text-[#1F1F1F] font-medium hover:text-[#6541D1]">
                    {item.firstName} - {item.lastName}
                  </span>
                  <span className="text-[#767676] font-light hover:text-[#6541D1]">
                    {item.email}
                  </span>
                </div>
              ))}
          </div>
        )}
      </ConfigProvider>
    </div>
  );
};

export default SearchInput;
