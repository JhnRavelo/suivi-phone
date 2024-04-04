import { createContext, useState } from "react";

const ProblemContext = createContext();

const ProblemProvider = ({ children }) => {
  const [problems, setProblems] = useState(null);

  return (
    <ProblemContext.Provider value={{ problems, setProblems }}>
      {children}
    </ProblemContext.Provider>
  );
};

export default ProblemContext;

export { ProblemProvider };
