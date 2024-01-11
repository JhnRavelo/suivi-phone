import { createContext, useState } from "react";

const QRCodeGeneratorContext = createContext();

const QRCodeGeneratorProvider = ({ children }) => {
  const [productTypes, setProductTypes] = useState([]);
  const [formDataQRCode, setFormDataQRCode] = useState();
  return (
    <QRCodeGeneratorContext.Provider
      value={{
        productTypes,
        setProductTypes,
        formDataQRCode,
        setFormDataQRCode,
      }}
    >
      {children}
    </QRCodeGeneratorContext.Provider>
  );
};

export { QRCodeGeneratorProvider };

export default QRCodeGeneratorContext;
