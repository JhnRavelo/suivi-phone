import React, { createContext, useState } from 'react'

const SuiviContext = createContext()

const SuiviProvider = ({children})=>{
    const [suivis, setSuivis] = useState([])
    return(
        <SuiviContext.Provider value={{suivis, setSuivis}}>
            {children}
        </SuiviContext.Provider>
    )
}

export {SuiviProvider}

export default SuiviContext
