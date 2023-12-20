import React from 'react'
import { Image, View } from 'react-native'
import logoEurop from "../assets/png/logo_ea.png"
import headerStyles from '../styles/header'
import LogoutButton from './LogoutButton'

const Header = () => {
  return (
    <View>
        <Image  source={logoEurop} style={headerStyles.logo} />
        <LogoutButton />
    </View>
  )
}

export default Header
