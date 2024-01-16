import React from 'react'
import { StyleSheet } from 'react-native'

const useMultiLineStyles = () => {
  return (
    StyleSheet.create({
        inputView: {
            marginTop: 20,
            alignItems: "center",
            justifyContent: "center"
        },
        input: {
            height: 100,
            width: "80%",
            borderWidth: 2,
            textAlignVertical: "top",
            padding: 5
        }
    })
  )
}

export default useMultiLineStyles