import React from "react";
import { Image, Text, TextInput, View } from "react-native";
import useStyles from "../styles/main";

const LoginInput = ({icon, value, onChange, placeholder, secure, errors, type }) => {
  const styles = useStyles()
  return (
    <View style={type == "input" ? [styles.loginField, {marginRight: 20}] : styles.loginField}>
      {type != "input" && <Image source={icon} style={styles.loginIcon} />}
      <TextInput
        value={value}
        secureTextEntry={secure}
        style={type == "input" ? [styles.loginInput, {marginBottom: 5, fontSize: 14, width: "100%", paddingBottom: 2}] : styles.loginInput}
        placeholder={placeholder}
        placeholderTextColor="#A2A2A2"
        onChangeText={onChange}
      />
      {errors ? (
        <Text style={styles.textError}>{errors}</Text>
      ) : null}
    </View>
  );
};

export default LoginInput;
