import { StyleSheet } from "react-native";

const useTabIconStyles = () => {
  return StyleSheet.create({
    viewStyle: { alignItems: "center" },
    iconStyle: {
      width: 25,
      height: 25,
    },
    textStyle: {
      fontSize: 12,
      fontFamily: "Lato-Regular",
      textTransform: "uppercase",
    },
  });
};

export default useTabIconStyles;
