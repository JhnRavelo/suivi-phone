import { StyleSheet, useWindowDimensions } from "react-native";

const useButtonStyles = () => {
  const { height, width } = useWindowDimensions();
  return StyleSheet.create({
    buttonContainer: { marginTop: height > 700 ? 50 : 20, alignItems: "center" },
    buttonView: { borderRadius: 7, padding: 10 },
    buttonText: {
      fontSize: height > 700 ? 28 : 26,
      fontFamily: "Lato-Regular",
    },
  });
};

export default useButtonStyles;
