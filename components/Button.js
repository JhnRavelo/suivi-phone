import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import scanStyles from "../styles/scanStyles";
import headerStyles from "../styles/header";
import buttonStyles from "../styles/buttonStyles";

const AppButton = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={buttonStyles.buttonContainer} onPress={()=>onPress()} >
      <View style={[headerStyles.logoutButtonView, scanStyles.scanButtonView, buttonStyles.buttonView]} >
        <Text style={[headerStyles.logoutButtonText, buttonStyles.buttonText]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AppButton;
