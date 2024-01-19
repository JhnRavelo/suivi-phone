import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import useButtonStyles from "../styles/buttonStyles";
import useHeaderStyles from "../styles/header";
import useScanStyles from "../styles/scanStyles"

const AppButton = ({ text, onPress, style, viewStyle, textStyle }) => {
  const headerStyles = useHeaderStyles()
  const scanStyles = useScanStyles()
  const buttonStyles = useButtonStyles()
  return (
    <TouchableOpacity style={[buttonStyles.buttonContainer, style]} onPress={()=>onPress()} >
      <View style={[headerStyles.logoutButtonView, scanStyles.scanButtonView, buttonStyles.buttonView, viewStyle]} >
        <Text style={[headerStyles.logoutButtonText, buttonStyles.buttonText, textStyle]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AppButton;
