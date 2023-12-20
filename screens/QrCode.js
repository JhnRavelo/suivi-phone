import React from "react";
import { View, Text } from "react-native";
import LinearGradientBody from "../components/LinearGradienBodyt";
import Header from "../components/Header";
import useStyles from "../styles/main";

const QrCode = () => {
  const styles = useStyles()
  return (
    <LinearGradientBody>
      <Header />
      <View style={styles.container}>
        
      </View>
    </LinearGradientBody>
  );
};

export default QrCode;