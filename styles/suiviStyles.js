import { useEffect } from "react";
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
      alignItems: "flex-start",
      marginRight: 25
    },
    tableHeader: {
      flexDirection: "row",
      paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor: "#D9D9D9",
      //   flex: 1,
      // textAlign: "center",
      // justifyContent: "center",
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
      borderColor: "#d1d1d1",
    },
    tableCell: {
      fontFamily: "Lato-Regular",
      fontSize: 14,
      flex: 1,
      color: "#1C2B39",
      paddingHorizontal: 5,
      textAlign: "justify",
      marginRight: 10
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
    progressStep: {
      maxHeight: height > 700 ? 450 : 400,
      height: height > 700 ? 450 : 400,
    },
    formScrollView: {
      maxHeight: "100%",
    },
    nextprevButton: {
      backgroundColor: "#1C2B39",
      height: "auto",
      width: "auto",
      padding: 3,
      borderRadius: 3,
      elevation: 2,
    },
    nexprevText: {
      fontFamily: "Lato-Regular",
      fontSize: 18,
      fontWeight: "500",
      color: "white",
    },
  });
};

export default useSuiviStyles;
