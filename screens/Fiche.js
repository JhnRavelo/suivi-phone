import React, { useEffect } from "react";
import { View, Text } from "react-native";
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
      {/* <View style={styles.container}> */}
      <FormTitle title="Fiche Technique" />
      <VerifyText
        items={fiche}
        labelStyle={{ width: 150 }}
        containerStyle={{ marginTop: 20}}
        contentStyle={{marginBottom: 20,}}
      />
      {/* </View> */}
    </LinearGradientBody>
  );
};

export default Fiche;
