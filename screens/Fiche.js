import React, { useEffect } from "react";
import useScreen from "../hooks/useScreen";
import { useRoute } from "@react-navigation/native";
import LinearGradientBody from "../components/LinearGradienBody";
import Header from "../components/Header";
import FormTitle from "../components/FormTitle";
import useFiche from "../hooks/useFiche";
import VerifyText from "../components/VerifyText";
import pdfIcon from "../assets/png/pdf.png";
import ReactButton from "../components/ReactButton";
import useButtonStyles from "../styles/buttonStyles";
import { View } from "react-native";

const Fiche = ({ navigation }) => {
  const screenRoute = useRoute();
  const { setScreen } = useScreen();
  let screenName = screenRoute.name;
  useEffect(() => {
    setScreen(screenName);
  }, [navigation]);
  const { fiche, pdf } = useFiche();
  const buttonStyles = useButtonStyles();

  const onPress = () => {
    navigation.navigate("pdf");
  };

  return (
    <LinearGradientBody>
      <Header />
      <FormTitle title="Fiche Technique" />
      <View style={{ display: "flex", alignItems: "center" }}>
        {pdf && <ReactButton
          onPress={() => onPress()}
          touchableStyle={[
            buttonStyles.buttonContainer,
            {
              width: 50,
              height: 50,
            },
          ]}
          icon={pdfIcon}
          iconStyle={{ tintColor: "#fff", width: 25, height: 25 }}
          viewStyle={buttonStyles.buttonView}
          textStyle={buttonStyles.buttonText}
        />}
      </View>
      <VerifyText
        items={fiche}
        labelStyle={{ width: 150, fontSize: 14 }}
        containerStyle={{ marginTop: 10 }}
        contentStyle={{ marginBottom: 10 }}
        textStyle={{ fontSize: 14 }}
      />
    </LinearGradientBody>
  );
};

export default Fiche;
