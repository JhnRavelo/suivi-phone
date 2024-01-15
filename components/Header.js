import React from 'react'
import { Image, StatusBar, View } from 'react-native'
import logoEurop from "../assets/png/logo_ea.png"
import LogoutButton from './LogoutButton'
import useHeaderStyles from '../styles/header'

const Header = () => {
  const headerStyles = useHeaderStyles()
  return (
    <View style={headerStyles.headerContainer}>
        <Image  source={logoEurop} style={headerStyles.logo} />
        <LogoutButton />
    </View>
  )
}

export default Header
