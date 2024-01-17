import React, { useContext } from 'react'
import FicheContext from '../context/FicheContext'

const useFiche = () => {
  return useContext(FicheContext)
}

export default useFiche