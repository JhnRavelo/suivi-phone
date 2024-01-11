import { createContext, useState } from "react";

const QRCodeGeneratorContext = createContext()

const QRCodeGeneratorProvider = ({children}) => {
    const [productTypes, setProductTypes] = useState([])
    return(
        <QRCodeGeneratorContext.Provider value={{productTypes, setProductTypes}} >
            {children}
        </QRCodeGeneratorContext.Provider>
    )
}

export {QRCodeGeneratorProvider}

export default QRCodeGeneratorContext