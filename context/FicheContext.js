import React, { createContext, useState } from "react";

const FicheContext = createContext();

const FicheProvider = ({ children }) => {
  const [fiche, setFiche] = useState([]);
  const [pdf, setPdf] = useState("")
  return (
    <FicheContext.Provider value={{ fiche, setFiche, pdf, setPdf }}>
      {children}
    </FicheContext.Provider>
  );
};

export { FicheProvider };

export default FicheContext;
