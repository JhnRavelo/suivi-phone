import { StyleSheet, useWindowDimensions } from "react-native";

const useSuiviStyles = () => {
  const { height, width } = useWindowDimensions();
  return StyleSheet.create({
    tableHeaderText: {
      color: "#1C2B39",
      fontSize: 18,
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
    flatListView: {
      overflow: "hidden",
      height: height > 700 ? 500 : 250,
    },
    tableRow: {
      flexDirection: "row",
      justifyContent: "space-between",
    //   elevation: 4,
      paddingVertical: 10,
      backgroundColor: "#fff",
      paddingHorizontal: 10,
      borderBottomWidth: 1,
      borderColor: "#d1d1d1"
    },
    tableCell: {
      fontFamily: "Lato-Regular",
      fontSize: 14,
      flex: 1,
      color: "#1C2B39",
      paddingHorizontal: 5,
      textAlign: "center",
    },
    buttonAddSuivi: {
      top: height > 700 ? -100 : -120,
    },
    buttonIcon: {
      width: 70,
      alignItems: "center",
      justifyContent: "center",
    },
    icon: {
      width: height > 700 ? 20 : 17,
      height: height > 700 ? 20 : 17,
      resizeMode: "contain",
    },
  });
};

export default useSuiviStyles;
