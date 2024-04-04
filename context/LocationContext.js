import { createContext, useState } from "react";

const LocationContext = createContext()

const LocationProvider = ({children})=>{
    const [location, setLocation] = useState(null)
    const [statusLocation, setStatusLocation] = useState("")
    return(
        <LocationContext.Provider value={{location, setLocation, statusLocation, setStatusLocation}}>
            {children}
        </LocationContext.Provider>
    )
}

export {LocationProvider}

export default LocationContext