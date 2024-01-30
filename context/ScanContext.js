import { createContext, useState } from "react";

const ScanContext = createContext();

const ScanProvider = ({ children }) => {
  const [scanned, setScanned] = useState(true);
  const [scanInfo, setScanInfo] = useState(null);
  return (
    <ScanContext.Provider
      value={{ scanned, setScanned, scanInfo, setScanInfo }}
    >
      {children}
    </ScanContext.Provider>
  );
};

export { ScanProvider };

export default ScanContext;
