import { StyleSheet } from "react-native";

const usePrintStyles = () => {
  return StyleSheet.create({
    copieContainerStyle: {
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      height: "80%",
    },
    copieContentStyle: {
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 10,
      paddingHorizontal: 15,
      display: "flex",
      borderWidth: 2,
      borderColor: "#A2A2A2",
      borderRadius: 3,
      flexDirection: "row",
      gap: 15,
      width: 300,
      height: 60,
    },
    copieTextStyle: {
      color: "#1C2B39",
      fontSize: 20,
      fontFamily: "Lato-Regular",
    },
    copieImgStyle: {
      width: 30,
      height: 30,
    },
  });
};

export default usePrintStyles;
