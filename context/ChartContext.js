import { createContext, useState } from "react";

const ChartContext = createContext();

const ChartProvider = ({ children }) => {
  const [years, setYears] = useState([]);
  const [statProducts, setStatProducts] = useState([]);
  const [statProblems, setStatProblems] = useState([]);
  return (
    <ChartContext.Provider
      value={{
        years,
        setYears,
        statProducts,
        setStatProducts,
        statProblems,
        setStatProblems,
      }}
    >
      {children}
    </ChartContext.Provider>
  );
};

export { ChartProvider };

export default ChartContext;
