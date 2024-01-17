import { StyleSheet, useWindowDimensions } from "react-native";

const useMultiLineStyles = () => {
  const { height, width } = useWindowDimensions();
  return StyleSheet.create({
    inputView: {
      marginTop: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    input: {
      height: height > 700 ? 120 : 100,
      width: "80%",
      borderWidth: 2,
      textAlignVertical: "top",
      padding: 5,
      fontFamily: "Lato-Regular",
      fontSize: height > 700 ? 16 : 14,
      color: "#1C2B39",
    },
  });
};

export default useMultiLineStyles;
