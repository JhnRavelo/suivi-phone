import React from "react";
import { View, Text } from "react-native";
import styles from "../styles/main";
import LinearGradientBody from "../components/LinearGradienBodyt";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";

const Scan = () => {
  const {auth} = useAuth()
  return (
    <LinearGradientBody>
      <Header />
      <View style={styles.container}>
        <Text style={{fontFamily: "Lato-Regular", fontSize: 34}} >{auth?.name}</Text>
      </View>
    </LinearGradientBody>
  );
};

export default Scan;
