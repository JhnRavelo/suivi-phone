import React from "react";
import { TextInput, View } from "react-native";
import useMultiLineStyles from "../styles/multiLineStyles";

const MultiLineInput = ({ placeholder }) => {
  const multiLineStyles = useMultiLineStyles();
  return (
    <View style={multiLineStyles.inputView}>
      <TextInput
        placeholder={placeholder}
        multiline
        style={multiLineStyles.input}
        placeholderTextColor="#A2A2A2"
      />
    </View>
  );
};

export default MultiLineInput;
