import React from "react";

type StatusProps = {
  status: string;
  grey?: string;
  red?: string;
  orange?: string;
  blue?: string;
  teal?: string;
  styleOption?: boolean;
};
const StatusView = ({
  status,
  grey,
  orange,
  red,
  blue,
  teal,
  styleOption = false,
}: StatusProps) => {
  return (
    <div className={`flex ${styleOption ? "" : "justify-center"}`}>
      {status === red ? (
        <div className="font-Exo font-bold text-[10px] leading-[13px] uppercase flex justify-center items-center text-[#EF4444] bg-[#FDEDED] rounded py-[2px] px-2">
          {red}
        </div>
      ) : status === orange ? (
        <div className="font-Exo font-bold text-[10px] leading-[13px] uppercase flex justify-center text-white items-center bg-[#DEA000] rounded py-[2px] px-2">
          {orange}
        </div>
      ) : status === grey ? (
        <div className="font-Exo font-bold text-[10px] leading-[13px] uppercase flex justify-center items-center text-gray-600 bg-[#EFF1F3] rounded py-[2px] px-2">
          {grey}
        </div>
      ) : status === blue ? (
        <div className="font-Exo font-bold text-[10px] leading-[13px] uppercase flex justify-center items-center text-[#205FBE] bg-[#E2EEFF] rounded py-[2px] px-2">
          {blue}
        </div>
      ) : status === teal ? (
        <div className="font-Exo font-bold text-[10px] leading-[13px] uppercase flex justify-center items-center text-[#00B2A9] bg-[#E0F8F6] rounded py-[2px] px-2">
          {teal}
        </div>
      ) : (
        "-"
      )}
    </div>
  );
};

export default StatusView;
