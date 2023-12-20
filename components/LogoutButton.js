import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import headerStyles from "../styles/header";
import useLogout from "../hooks/useLogout";

const LogoutButton = () => {
  const logout = useLogout();
  return (
    <TouchableOpacity
      onPress={() => {
        logout();
      }}
    >
      <View style={headerStyles.logoutButtonView}>
        <Text style={headerStyles.logoutButtonText}>Déconnexion</Text>
      </View>
    </TouchableOpacity>
  );
};

export default LogoutButton;
