import React from "react";
import { Image, Text, TextInput, View } from "react-native";
import styles from "../styles/main";

const LoginInput = ({icon, value, onChange, placeholder, secure, errors }) => {
  return (
    <View style={styles.loginField}>
      <Image source={icon} style={styles.loginIcon} />
      <TextInput
        value={value}
        secureTextEntry={secure}
        style={styles.loginInput}
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
