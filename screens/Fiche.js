import React, { useEffect } from "react";
import { View, Text } from "react-native";
import LinearGradientBody from "../components/LinearGradienBodyt";
import Header from "../components/Header";
import useStyles from "../styles/main";
import useScreen from "../hooks/useScreen";
import { useRoute } from "@react-navigation/native";

const Fiche = ({ navigation }) => {
  const styles = useStyles();
  const screenRoute = useRoute();
  const { setScreen, screen } = useScreen();
  let screenName = screenRoute.name;
  useEffect(() => {
    setScreen(screenName);
  }, [navigation]);
  return (
    <LinearGradientBody>
      <Header />
      <View style={styles.container}>
        <Text>Fiche</Text>
      </View>
    </LinearGradientBody>
  );
};

export default Fiche;
