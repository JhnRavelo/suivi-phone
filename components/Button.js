import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import useButtonStyles from "../styles/buttonStyles";
import useHeaderStyles from "../styles/header";
import useScanStyles from "../styles/scanStyles"

const AppButton = ({ text, onPress, style }) => {
  const headerStyles = useHeaderStyles()
  const scanStyles = useScanStyles()
  const buttonStyles = useButtonStyles()
  return (
    <TouchableOpacity style={[buttonStyles.buttonContainer, style]} onPress={()=>onPress()} >
      <View style={[headerStyles.logoutButtonView, scanStyles.scanButtonView, buttonStyles.buttonView]} >
        <Text style={[headerStyles.logoutButtonText, buttonStyles.buttonText]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AppButton;
