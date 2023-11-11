import { useState } from "react";

const useOperation = () => {
  const [searchText, setSearchText] = useState("");
  const [azActive, setAzActive] = useState("");

  return {
    searchText,
    setSearchText,
    azActive,
    setAzActive,
  };
};

export default useOperation;
