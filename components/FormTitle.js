import React from "react";
import { Text, View } from "react-native";
import useFormTitleStyle from "../styles/formTitleStyle";

const FormTitle = ({ title }) => {
  const formTitleStyle = useFormTitleStyle()
  return (
    <View style={formTitleStyle.titleView}>
      <Text style={formTitleStyle.titleText}>{title}</Text>
    </View>
  );
};

export default FormTitle;
