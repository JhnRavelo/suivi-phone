import { StyleSheet } from "react-native";

const colorBlue = "#1C2B39";

const useChartStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ebecde",
    },
    textContainer: {
      marginHorizontal: 10,
      marginBottom: 20,
    },
    textTitle: {
      fontFamily: "Lato-Regular",
      fontSize: 24,
      color: colorBlue,
    },
    textSteps: {
      fontFamily: "Lato-Regular",
      fontSize: 18,
      color: colorBlue,
    },
    infoContainer: { flexDirection: "row", justifyContent: "space-around" },
    infoView: {
      borderWidth: 2,
      borderColor: colorBlue,
      width: "auto",
      padding: 10,
      elevation: 2,
    },
    pickerView: {
      width: 120,
      backgroundColor: "#fff",
      height: 50,
      borderRadius: 5,
      elevation: 5,
    },
  });
};

export default useChartStyles;
