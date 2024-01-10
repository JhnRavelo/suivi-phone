import { createContext, useState } from "react";

const ScanContext = createContext();

const ScanProvider = ({ children }) => {
  const [scanned, setScanned] = useState(false);
  const [scanInfo, setScanInfo] = useState("");
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
