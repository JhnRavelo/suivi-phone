import React from 'react'
import { TextInput, View } from 'react-native'
import useMultiLineStyles from '../styles/multiLineStyles'

const MultiLineInput = ({placeholder}) => {
    const multiLineStyles = useMultiLineStyles()
  return (
    <View style={multiLineStyles.inputView}>
        <TextInput placeholder={placeholder} multiline style={multiLineStyles.input} />
    </View>
  )
}

export default MultiLineInput