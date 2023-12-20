import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
import styles from "../styles/main";

const LinearGradientBody = ({ children }) => {
  return (
    <LinearGradient colors={["#5F7FAB", "#888A98"]} style={{ flex: 1 }}>
      <View style={styles.body}>
        {children}
      </View>
    </LinearGradient>
  );
};

export default LinearGradientBody;
