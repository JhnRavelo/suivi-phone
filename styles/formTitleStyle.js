import React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";

const useFormTitleStyle = () => {
  const { width, height } = useWindowDimensions();
  return StyleSheet.create({
    titleView: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "auto",
      padding: 15,
      marginBottom: -10,
    },
    titleText: {
      fontSize: height > 700 ? 28 : 26,
      color: "#1C2B39",
      fontWeight: height > 700 ? "900" : "600",
      fontFamily: "Lato-Regular",
    },
  });
};

export default useFormTitleStyle;
