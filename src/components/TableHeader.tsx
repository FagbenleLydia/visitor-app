import Search from "@/assets/svg/Search";
import { Input } from "antd";
import React, { useState } from "react";
import DropDownFilter from "./DropDownFilter";
import { StringNull } from "@/types";
import { StatusOut, dateList } from "@/util/Constants";
import DateIcon from "@/assets/svg/date-icon";
import FilterIcon from "@/assets/svg/filter-icon";

type props = {
  firstName: string;
  timeIn: string;
  timeOut: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  setTimeIn: React.Dispatch<React.SetStateAction<string>>;
  setTimeOut: React.Dispatch<React.SetStateAction<string>>;
};

const TableHeader = ({
  firstName,
  setFirstName,
  timeIn,
  setTimeIn,
  timeOut,
  setTimeOut,
}: props) => {
  const [active, setActive] = useState("");

  return (
    <div className="flex space-x-8 items-center">
      <Input
        type="text"
        onPressEnter={(e: any) => setFirstName(e.target.value)}
        onChange={(e) => {
          if (e.target.value.length === 0) {
            setFirstName("");
          }
        }}
        placeholder="Search for name"
        className="h-[56px] w-[429px] rounded-[12px] bg-[#F3F3F3] border border-solid border-[#EAEAEC]"
        prefix={<Search />}
      />
      <DropDownFilter
        active={active === "" ? "All time" : active}
        setActive={setActive}
        data={dateList}
        icon={<DateIcon />}
        title="Date"
        endDate={timeOut}
        setEndDate={setTimeOut}
        startDate={timeIn}
        setStartDate={setTimeIn}
      />

      {/* <DropDownFilter
        active={status === "" ? "All" : status}
        setActive={setStatus}
        data={StatusOut}
        icon={<FilterIcon />}
        title="Filter by"
      /> */}
    </div>
  );
};

export default TableHeader;
