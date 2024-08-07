import { StyleSheet } from "react-native";

const useDropDownListStyles = () => {
  return StyleSheet.create({
    container: {
      backgroundColor: "white",
      padding: 16,
      marginBottom: -14,
    },
    dropdown: {
      height: 40,
      borderColor: "#A2A2A2",
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 0,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: "absolute",
      backgroundColor: "white",
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 0,
      fontSize: 12,
    },
    placeholderStyle: {
      fontSize: 14,
    },
    selectedTextStyle: {
      fontSize: 14,
      color: "#A2A2A2",
      fontWeight: "700",
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 14,
    },
    itemTextStyle: {
      fontSize: 14,
      paddingTop: 5,
      paddingBottom: 5,
      marginBottom: -20,
      marginTop: -20,
    },
    leftIconView: {
      width: "auto",
      height: "auto",
      alignItems: "center",
      justifyContent: "center",
      padding: 3,
    },
  });
};

export default useDropDownListStyles;
