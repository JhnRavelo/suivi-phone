import { StyleSheet, useWindowDimensions } from "react-native";

const useButtonStyles = () => {
  const { height, width } = useWindowDimensions();
  return StyleSheet.create({
    buttonContainer: {
      marginTop: height > 700 ? 30 : 20,
      alignItems: "center",
      elevation: 5
    },
    buttonView: {
      elevation: 10,
      backgroundColor: "#1C2B39",
      borderRadius: 7,
      padding: 10,
    },
    buttonText: {
      color: "#fff",
      fontWeight: "700",
      fontSize: height > 700 ? 28 : 26,
      fontFamily: "Lato-Regular",
    },
  });
};

export default useButtonStyles;
