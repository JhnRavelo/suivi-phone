import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native";
import useStyles from "../styles/main";

const LinearGradientBody = ({ children }) => {
  const styles = useStyles()
  return (
    <LinearGradient colors={["#5F7FAB", "#888A98"]} style={{ flex: 1 }}>
      <SafeAreaView style={styles.body}>
        {children}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LinearGradientBody;
