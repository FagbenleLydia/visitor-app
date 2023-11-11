"use client";
import Logo from "@/assets/svg/Logo";
import User from "@/assets/svg/User";
import { usePathname, useRouter } from "next/navigation";
import { Popover } from "antd";
import React from "react";
import Signout from "@/assets/svg/Signout";
import Hamburger from "@/assets/svg/Hamburger";
import Logolong from "@/assets/svg/logolong";
import LogUser from "@/assets/svg/logUser";
import Book from "@/assets/svg/Book";
import Bookmark from "@/assets/svg/Bookmark";
import Cache from "@/util/cache";
import useStore from "@/store";

const Header = ({ showrest = true }: { showrest?: boolean }) => {
  const pathname = usePathname();
  const router = useRouter();
  const userDetail = useStore((state) => state.userDetail);

  const content = (
    <div className="p-4 w-[300px]">
      <h4 className="text-[16px] text-[#344054] font-medium leading-[19.2px] mb-2">
        {userDetail.userRole}
      </h4>
      <p className="text-[12px] text-[#AFAFAF] mb-6">
        {userDetail.emailAddress}
      </p>
      <div
        onClick={() => router.push("/book-entry")}
        className="flex items-center py-4 my-6 cursor-pointer"
      >
        <LogUser />
        <span className="ml-3 text-[16px] text-[#1F1F1F] leading-[19.2px] ">
          Book visitor entry
        </span>
      </div>
      <div
        onClick={() => router.push("/check-in")}
        className="flex items-center py-4 my-6 cursor-pointer"
      >
        <Bookmark />
        <span className="ml-3 text-[16px] text-[#1F1F1F] leading-[19.2px] ">
          Check-in history
        </span>
      </div>
      <div
        onClick={() => {
          Cache.removeCookie("token");
          router.push("/sign-in");
        }}
        className="flex items-center py-4 mb-[10px] cursor-pointer"
      >
        <Signout />
        <span className="ml-3 text-[16px] text-[#E53030] leading-[19.2px]">
          Log out
        </span>
      </div>
    </div>
  );
  return (
    <div className="flex justify-between items-center w-full h-[79px] px-4 py-3 rounded-xl bg-[#F6F7FB]">
      <div>
        {pathname === "/" || pathname === "/sign-in" ? <Logo /> : <Logolong />}
      </div>
      {showrest && (
        <Popover
          placement="bottomLeft"
          arrow={false}
          content={content}
          title=""
        >
          <div className="flex justify-center items-center w-[48px] h-[48px] rounded-[24px] bg-[#FFFFFF] cursor-pointer">
            <Hamburger />
          </div>
        </Popover>
      )}
    </div>
  );
};

export default Header;
