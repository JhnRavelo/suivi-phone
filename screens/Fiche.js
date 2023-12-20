import React from "react";
import { View, Text } from "react-native";
import LinearGradientBody from "../components/LinearGradienBodyt";
import Header from "../components/Header";
import useStyles from "../styles/main";

const Fiche = () => {
  const styles = useStyles()
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
