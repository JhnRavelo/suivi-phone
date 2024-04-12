import React from "react";
import { Image, View } from "react-native";
import logoEurop from "../assets/png/logo_ea.png";
import useHeaderStyles from "../styles/headerStyles";
import ReactButton from "./ReactButton";
import useLogout from "../hooks/useLogout";

const Header = () => {
  const headerStyles = useHeaderStyles();
  const logout = useLogout();
  return (
    <View style={headerStyles.headerContainer}>
      <Image source={logoEurop} style={headerStyles.logo} />
      <ReactButton
        touchableStyle={headerStyles.logoutButton}
        viewStyle={headerStyles.logoutButtonView}
        textStyle={headerStyles.logoutButtonText}
        text="Déconnexion"
        onPress={() => logout()}
      />
    </View>
  );
};

export default Header;
