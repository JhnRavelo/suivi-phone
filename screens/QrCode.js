import React from "react";
import { View, Text } from "react-native";
import styles from "../styles/main";
import LinearGradientBody from "../components/LinearGradienBodyt";
import Header from "../components/Header";

const QrCode = () => {
  return (
    <LinearGradientBody>
      <Header />
      <View style={styles.container}>
        <Text>QR Code</Text>
      </View>
    </LinearGradientBody>
  );
};

export default QrCode;