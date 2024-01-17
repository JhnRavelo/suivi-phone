import { StyleSheet, useWindowDimensions } from "react-native";

const useVerifyTextStyles = () => {
    const {height, width} = useWindowDimensions()
  return StyleSheet.create({
    verifyTextContainer: { display: "flex", flexDirection: "column" },
    verifyTextView: {
      display: "flex",
      flexDirection: "row",
      gap: 20,
      padding: 5,
      paddingLeft: 25,
    },
    verifyTextTitle: {
      flex: 0,
      width: 100,
      color: "#E4570F",
      fontSize: 14,
      fontWeight: "bold",
    },
    verifyTextValue: { flex: 1, fontSize: 14 },
  });
};

export default useVerifyTextStyles;
