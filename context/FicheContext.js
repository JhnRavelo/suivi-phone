import React, { createContext, useState } from "react";

const FicheContext = createContext();

const FicheProvider = ({ children }) => {
  const [fiche, setFiche] = useState();
  return (
    <FicheContext.Provider value={{ fiche, setFiche }}>
      {children}
    </FicheContext.Provider>
  );
};

export { FicheProvider };

export default FicheContext;
