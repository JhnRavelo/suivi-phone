import React from "react";
import useStyles from "../styles/main";
import qrcodeStyles from "../styles/qrcodeStyles";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import Header from "./Header";
import LinearGradientBody from "./LinearGradienBody";
import AppButton from "./Button";

const FormContainer = ({ children, text, onPress }) => {
    const styles = useStyles()
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <LinearGradientBody>
        <Header />
        <View style={styles.container}>
          <View style={qrcodeStyles.formContainer}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              style={qrcodeStyles.formScrollView}
            >
              {children}
            </ScrollView>
            <AppButton text={text} onPress={onPress} />
          </View>
        </View>
      </LinearGradientBody>
    </KeyboardAvoidingView>
  );
};

export default FormContainer;
