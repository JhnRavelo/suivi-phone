import React from "react";
import { Image, Text, TextInput, View } from "react-native";
import useStyles from "../styles/main";
import qrcodeStyles from "../styles/qrcodeStyles";

const LoginInput = ({
  icon,
  value,
  onChange,
  placeholder,
  secure,
  errors,
  type,
}) => {
  const styles = useStyles();
  return (
    <View
      style={
        type == "input"
          ? [styles.loginField, qrcodeStyles.inputView]
          : styles.loginField
      }
    >
      {type != "input" && <Image source={icon} style={styles.loginIcon} />}
      <TextInput
        value={value}
        secureTextEntry={secure}
        style={
          type == "input"
            ? [styles.loginInput, qrcodeStyles.input]
            : styles.loginInput
        }
        placeholder={placeholder}
        placeholderTextColor="#A2A2A2"
        onChangeText={onChange}
      />
      {errors ? (
        <Text
          style={
            type == "input"
              ? [styles.textError, qrcodeStyles.textError]
              : styles.textError
          }
        >
          {errors}
        </Text>
      ) : null}
    </View>
  );
};

export default LoginInput;
