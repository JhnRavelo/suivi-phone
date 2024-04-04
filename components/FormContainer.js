import React from "react";
import useStyles from "../styles/main";
import useQrcodeStyles from "../styles/qrcodeStyles";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import Header from "./Header";
import LinearGradientBody from "./LinearGradienBody";
import useSuiviStyles from "../styles/suiviStyles";
import ReactButton from "./ReactButton";
import useButtonStyles from "../styles/buttonStyles";

const FormContainer = ({ children, text, onPress, screen, index }) => {
  const styles = useStyles();
  const qrcodeStyles = useQrcodeStyles();
  const suiviStyles = useSuiviStyles();
  const buttonStyles = useButtonStyles();
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
              style={
                screen === "step"
                  ? [qrcodeStyles.formScrollView, suiviStyles.formScrollView]
                  : qrcodeStyles.formScrollView
              }
            >
              {children}
            </ScrollView>
            {screen !== "step" && (
              <ReactButton
                onPress={() => onPress()}
                text={text}
                touchableStyle={buttonStyles.buttonContainer}
                viewStyle={buttonStyles.buttonView}
                textStyle={buttonStyles.buttonText}
              />
            )}
          </View>
        </View>
      </LinearGradientBody>
    </KeyboardAvoidingView>
  );
};

export default FormContainer;
