import { StyleSheet, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import useAppLoaderStyles from "../styles/appLoaderStyles";

const AppLoader = () => {
  const appLoaderStyles = useAppLoaderStyles();
  return (
    <View style={[StyleSheet.absoluteFill, appLoaderStyles.loadingContainer]}>
      <LottieView
        style={{ height: 180, width: 180 }}
        source={require("../assets/json/Animation - 1705906575951.json")}
        autoPlay
        loop
      />
    </View>
  );
};

export default AppLoader;
