import { useContext } from 'react'
import ChartContext from '../context/ChartContext'

const useChart = () => {
  return useContext(ChartContext)
}

export default useChart