import { StyleSheet } from "react-native";

const useSortSuiviStyles = () => {
  return StyleSheet.create({
    sortContainer: {
      paddingLeft: 10,
      paddingTop: 10,
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    dateView: {
      width: 160,
      height: 25,
      borderWidth: 2,
      borderColor: "white",
      borderRadius: 5,
    },
    dateText: {
      color: "#1C2B39",
      fontWeight: "500",
      textAlign: "center",
      fontSize: 13,
    },
    inputView: {
      width: 120,
      height: 25,
      backgroundColor: "white",
      borderRadius: 5,
    },
    input: { width: "100%", paddingHorizontal: 10 },
  });
};

export default useSortSuiviStyles;
