import React, { useContext } from 'react'
import QRCodeGeneratorContext from '../context/QRCodeGeneratorContext'

const useQRCodeGenerator = () => {
  return useContext(QRCodeGeneratorContext)
}

export default useQRCodeGenerator