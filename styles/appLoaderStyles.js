import { StyleSheet } from 'react-native'

const useAppLoaderStyles = ()=>{
return StyleSheet.create({
    loadingContainer: {
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
    }
})
}

export default useAppLoaderStyles
