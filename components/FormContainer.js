import React from "react";
import useStyles from "../styles/main";
import useQrcodeStyles from "../styles/qrcodeStyles";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import Header from "./Header";
import LinearGradientBody from "./LinearGradienBody";
import AppButton from "./Button";
import ButtonStep from "./ButtonStep";

const FormContainer = ({ children, text, onPress, screen, index }) => {
    const styles = useStyles()
    const qrcodeStyles = useQrcodeStyles()
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
            {screen==="step"? <ButtonStep index={index} /> :<AppButton text={text} onPress={onPress} />}
          </View>
        </View>
      </LinearGradientBody>
    </KeyboardAvoidingView>
  );
};

export default FormContainer;
