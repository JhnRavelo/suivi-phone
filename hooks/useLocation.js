import { useContext } from "react"
import LocationContext from "../context/LocationContext"

const useLocation = ()=>{
    return useContext(LocationContext)
}

export default useLocation