import React, { useContext } from 'react'
import QRCodeGeneratorContext from '../context/QRCodeGeneratorContext'

const useQRCodeForm = () => {
  return useContext(QRCodeGeneratorContext)
}

export default useQRCodeForm