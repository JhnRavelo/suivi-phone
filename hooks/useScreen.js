import React, { useContext } from "react";
import ScreenContext from "../context/ScreenContext";

const useScreen = () => {
  return useContext(ScreenContext);
};

export default useScreen;
