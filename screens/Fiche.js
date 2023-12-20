import React from "react";
import { View, Text } from "react-native";
import styles from "../styles/main";
import LinearGradientBody from "../components/LinearGradienBodyt";
import Header from "../components/Header";

const Fiche = () => {
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
