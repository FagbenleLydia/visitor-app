import React from "react";

const NumberDivider = () => {
  return (
    <div className="flex items-center">
      <p className="text-[16px] text-[#344054] mr-4">+234&nbsp;&nbsp;</p>
      <svg
        width="2"
        height="45"
        viewBox="0 0 2 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1 44L1 1" stroke="#AFAFAF" stroke-linecap="round" />
      </svg>
    </div>
  );
};

export default NumberDivider;
