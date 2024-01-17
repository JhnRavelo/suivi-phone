import { StyleSheet, useWindowDimensions } from "react-native";

const useQrcodeStyles = () => {
  const {width, height} = useWindowDimensions()
  return StyleSheet.create({
    formContainer: {
      backgroundColor: "#fff",
      width: height > 700 ? 380 : 350,
      height: height > 700 ? 450 : 400,
      borderRadius: 8,
      marginBottom: 80,
    },
    formScrollView: { maxHeight: height > 700 ? 420 : 300, overflow: "hidden" },
    input: { marginBottom: 5, fontSize: 14, width: "100%", paddingBottom: 2 },
    inputView: { marginRight: 20 },
    textError: { fontSize: 12 },
  });
};

export default useQrcodeStyles;
