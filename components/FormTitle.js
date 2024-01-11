import React from "react";
import { Text, View } from "react-native";
import formTitleStyle from "../styles/formTitleStyle";

const FormTitle = ({ title }) => {
  return (
    <View style={formTitleStyle.titleView}>
      <Text style={formTitleStyle.titleText}>{title}</Text>
    </View>
  );
};

export default FormTitle;
