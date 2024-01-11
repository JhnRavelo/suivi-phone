import { createContext, useState } from "react";

const QRCodeGeneratorContext = createContext();

const QRCodeGeneratorProvider = ({ children }) => {
  const [productTypes, setProductTypes] = useState([]);
  const [formDataQRCode, setFormDataQRCode] = useState({});
  const [dataQRCodeVerify, setDataQRCodeVerify] = useState([]);
  return (
    <QRCodeGeneratorContext.Provider
      value={{
        productTypes,
        setProductTypes,
        formDataQRCode,
        setFormDataQRCode,
        dataQRCodeVerify,
        setDataQRCodeVerify,
      }}
    >
      {children}
    </QRCodeGeneratorContext.Provider>
  );
};

export { QRCodeGeneratorProvider };

export default QRCodeGeneratorContext;
