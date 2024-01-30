import React, { useEffect } from "react";
import LinearGradientBody from "../components/LinearGradienBody";
import Header from "../components/Header";
import useScreen from "../hooks/useScreen";
import { useRoute } from "@react-navigation/native";
import FormTitle from "../components/FormTitle";
import useFiche from "../hooks/useFiche";
import VerifyText from "../components/VerifyText";

const Fiche = ({ navigation }) => {
  const screenRoute = useRoute();
  const { setScreen } = useScreen();
  const { fiche } = useFiche();
  let screenName = screenRoute.name;
  useEffect(() => {
    setScreen(screenName);
  }, [navigation]);
  return (
    <LinearGradientBody>
      <Header />
      <FormTitle title="Fiche Technique" />
      <VerifyText
        items={fiche}
        labelStyle={{ width: 150, fontSize: 14 }}
        containerStyle={{ marginTop: 20 }}
        contentStyle={{ marginBottom: 20 }}
        textStyle={{ fontSize: 14 }}
      />
    </LinearGradientBody>
  );
};

export default Fiche;
