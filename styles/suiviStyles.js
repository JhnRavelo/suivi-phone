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
      marginHorizontal: 10,
    },
    tableHeader: {
      flexDirection: "row",
      paddingVertical: 10,
      backgroundColor: "#D9D9D9",
    },
    flatListView: {
      overflow: "hidden",
      height: height > 700 ? 400 : 240,
    },
    tableRow: {
      flexDirection: "row",
      paddingVertical: 10,
      backgroundColor: "#fff",
      borderBottomWidth: 1,
      borderColor: "#d1d1d1",
    },
    tableCellView: {
      marginHorizontal: 10,
    },
    tableCell: {
      fontFamily: "Lato-Regular",
      fontSize: 14,
      color: "#1C2B39",
      textAlign: "justify",
    },
    imgContainer: {
      marginTop: 0,
    },
    imgStyle: {
      width: 70,
      height: 70,
      resizeMode: "cover",
    },
    buttonAddSuivi: {
      top: height > 700 ? -110 : -100,
      alignItems: "flex-end",
      marginRight: "10%"
    },
    buttonIcon: {
      alignItems: "center",
      paddingLeft: 20,
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
