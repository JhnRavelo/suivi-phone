import React, { createContext, useState } from "react";

const SuiviContext = createContext();

const SuiviProvider = ({ children }) => {
  const [suivis, setSuivis] = useState([]);
  const [images, setImages] = useState(null);
  return (
    <SuiviContext.Provider value={{ suivis, setSuivis, images, setImages }}>
      {children}
    </SuiviContext.Provider>
  );
};

export { SuiviProvider };

export default SuiviContext;
