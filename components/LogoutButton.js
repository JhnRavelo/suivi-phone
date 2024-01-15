import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import useLogout from "../hooks/useLogout";
import useHeaderStyles from "../styles/header";

const LogoutButton = () => {
  const headerStyles = useHeaderStyles()
  const logout = useLogout();
  return (
    <TouchableOpacity
      onPress={() => {
        logout();
      }}
      style={headerStyles.logoutButton}
    >
      <View style={headerStyles.logoutButtonView}>
        <Text style={headerStyles.logoutButtonText}>Déconnexion</Text>
      </View>
    </TouchableOpacity>
  );
};

export default LogoutButton;
