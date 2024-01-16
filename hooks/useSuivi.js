import React, { useContext } from "react";
import SuiviContext from "../context/SuiviContext";

const useSuivi = () => {
  return useContext(SuiviContext);
};

export default useSuivi;
