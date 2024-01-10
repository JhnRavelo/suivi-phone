import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import headerStyles from '../styles/header'
import scanStyles from '../styles/scanStyles'
import useScan from '../hooks/useScan'

const ScanButton = () => {
    const {setScanned} = useScan()
  return (
    <TouchableOpacity style={scanStyles.scanButton} onPress={()=>setScanned(false)} >
        <View style={[headerStyles.logoutButtonView, scanStyles.scanButtonView]}>
            <Text style={[headerStyles.logoutButtonText, scanStyles.scanButtonText]}>Scanner</Text>
        </View>
    </TouchableOpacity>
  )
}

export default ScanButton
