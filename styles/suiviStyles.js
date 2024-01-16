import { StyleSheet } from "react-native";

const useSuiviStyles = () => {
  return StyleSheet.create({
    tableHeaderText: {
      color: "#1C2B39",
      fontSize: 17,
      fontWeight: "300",
      fontFamily: "Lato-Regular",
    },
    tableContainer: {
      flex: 1,
      paddingHorizontal: 0,
      paddingVertical: 30,
      marginTop: -20,
    },
    listContainer: {
      flex: 1,
    },
    tableHeaderView: {
      alignItems: "center",

    },
    tableHeader: {
      flexDirection: "row",
      paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor: "#D9D9D9",
      //   flex: 1,
      textAlign: "center",
      justifyContent: "center",
    },
    tableRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      elevation: 2,
      paddingVertical: 10,
      backgroundColor: "#fff",
      paddingHorizontal: 10,
    },
    tableCell: {
      fontFamily: "Lato-Regular",
      fontSize: 14,
      flex: 1,
      color: "#1C2B39",
      paddingHorizontal: 5,
      textAlign: "center"
    },
  });
};

export default useSuiviStyles;
