import { Dropdown, DatePicker } from "antd";
import { useState } from "react";
import { DropDownFilterType, StringNull } from "@/types";
import { format } from "date-fns";
import ArrowDownIcon from "@/assets/svg/arrow-down";
import type { Dayjs } from "dayjs";
import { RangeValue } from "rc-picker/lib/interface";

type DropDownFilterProps = {
  active: string;
  setActive: (active: string) => void;
  data: DropDownFilterType[];
  title?: string;
  icon?: React.ReactNode;
  showTitle?: boolean;
  setSearchField?: (name: string) => void;
  searchField?: string;
  placeholder?: string;
  setStartDate?: (date: string) => void;
  setEndDate?: (date: string) => void;
  startDate?: string;
  endDate?: string;
};

const { RangePicker } = DatePicker;

function DropDownFilter({
  active,
  setActive,
  data,
  title,
  icon,
  setStartDate,
  setEndDate,
  startDate,
  endDate,
}: DropDownFilterProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<{
    startDate: string;
    endDate: string;
  }>({
    startDate: "",
    endDate: "",
  });

  const handleChange = (
    values: RangeValue<Dayjs>,
    formatString: [string, string]
  ) => {
    setDate({
      startDate: formatString[0],
      endDate: formatString[1],
    });
  };

  const dropdownHandler = () => {
    return (
      <div
        className={`rounded-xl bg-white px-[8.5px] py-5 flex-col flex shadow-md relative `}
      >
        {data.map((item, i) => (
          <button
            onClick={() => {
              setActive(item.value);
              const newDateFn = item.value.split(",");
              if (item.value !== "date-range") {
                setOpen(false);
                setStartDate && setStartDate(newDateFn[0]);
                setEndDate && setEndDate(newDateFn[1]);
              }
            }}
            key={i}
            className={`${
              active === item.label ? "bg-[#F3F3F3] rounded-xl" : "bg-white"
            } px-4 text-left py-4 cursor-pointer`}
          >
            <span
              className={`inline-block ${
                active === item.value
                  ? "font-bold text-[#1F1F26]"
                  : "font-normal text-placeholder-gray"
              }  text-[14px] leading-[19px]`}
            >
              {active === "date-range" && item.value === "date-range" ? (
                <div className="flex flex-col w-full">
                  <RangePicker onChange={handleChange} />
                  <div className="flex justify-end mt-4 space-x-2">
                    <div
                      role="button"
                      onClick={() => {
                        setTimeout(() => {
                          setActive("");
                        }, 100);
                        setDate({ startDate: "", endDate: "" });
                        setStartDate && setStartDate("");
                        setEndDate && setEndDate("");
                        setOpen(false);
                      }}
                      className="px-4 py-2 text-pos-blue text-sm font-medium bg-[#F6F7FB] rounded-lg"
                    >
                      Clear
                    </div>

                    <div
                      role="button"
                      onClick={() => {
                        setStartDate && setStartDate(date.startDate);
                        setEndDate && setEndDate(date.endDate);
                        setOpen(false);
                      }}
                      className="px-4 py-2 text-sm font-medium text-white bg-[#6541D1] rounded-lg"
                    >
                      Apply
                    </div>
                  </div>
                </div>
              ) : (
                item.label
              )}
            </span>
          </button>
        ))}
      </div>
    );
  };

  return (
    <Dropdown
      onOpenChange={(open) => {
        setOpen(open);
        if (!open) {
        }
      }}
      dropdownRender={() => dropdownHandler()}
      trigger={["click"]}
      destroyPopupOnHide={true}
      placement="bottomRight"
      open={open}
    >
      <div className="flex justify-center items-center px-4 h-[56px] bg-[#F6F7FB] rounded-xl cursor-pointer w-fit flex-shrink-0">
        {title && (
          <span className="inline-block font-semibold text-sm leading-[150%]  mr-[10.5px]">
            {title}
          </span>
        )}
        {icon}

        <span className="font-medium inline-block text-sm  px-4 ">
          {active === "date-range"
            ? `${
                startDate
                  ? format(new Date(startDate), "dd LLL, yyyy")
                  : "Start Date"
              } - ${
                endDate
                  ? format(new Date(endDate || new Date()), "dd LLL, yyyy")
                  : "End Date"
              }`
            : data.find((item) => item.value === active)?.label ?? active}
        </span>

        <div className="flex-shrink-0">
          <ArrowDownIcon color="#A6A7AA" width="20" height="20" />
        </div>
      </div>
    </Dropdown>
  );
}

export default DropDownFilter;
