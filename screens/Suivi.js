import React from "react";
import { View, Text } from "react-native";
import styles from "../styles/main";
import LinearGradientBody from "../components/LinearGradienBodyt";
import Header from "../components/Header";

const Suivi = () => {
  return (
    <LinearGradientBody>
      <Header />
      <View style={styles.container}>
        <Text>Suivi</Text>
      </View>
    </LinearGradientBody>
  );
};

export default Suivi;