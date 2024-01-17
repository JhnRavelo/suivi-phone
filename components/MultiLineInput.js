import React from "react";
import { Text, TextInput, View } from "react-native";
import useMultiLineStyles from "../styles/multiLineStyles";
import useStyles from "../styles/main";

const MultiLineInput = ({ placeholder, error, value, onChange }) => {
  const multiLineStyles = useMultiLineStyles();
  const styles = useStyles()
  return (
    <View style={multiLineStyles.inputView}>
      <TextInput
        placeholder={placeholder}
        multiline
        style={multiLineStyles.input}
        placeholderTextColor="#A2A2A2"
        onChangeText={onChange}
        value={value}
      />
      {error && <Text style={styles.textError}>{error}</Text>}
    </View>
  );
};

export default MultiLineInput;
