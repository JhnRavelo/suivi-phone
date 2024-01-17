import React, { createContext, useState } from "react";

const FicheContext = createContext();

const FicheProcider = ({ children }) => {
  const [fiche, setFiche] = useState();
  return (
    <FicheContext.Provider value={{ fiche, setFiche }}>
      {children}
    </FicheContext.Provider>
  );
};

export {FicheProcider}

export default FicheContext;
