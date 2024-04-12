import React from "react";
import { Text, View } from "react-native";
import useFormTitleStyles from "../styles/formTitleStyles";

const FormTitle = ({ title }) => {
  const formTitleStyles = useFormTitleStyles()
  return (
    <View style={formTitleStyles.titleView}>
      <Text style={formTitleStyles.titleText}>{title}</Text>
    </View>
  );
};

export default FormTitle;
