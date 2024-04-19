import { StyleSheet, useWindowDimensions } from "react-native";

const colorBlue = "#1C2B39";

const useChartStyles = () => {
  const { width, height } = useWindowDimensions();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ebecde",
    },
    textContainer: {
      marginHorizontal: width < 380 ? 5 : 10,
      marginBottom: width < 380 ? 14 : 20,
    },
    textTitle: {
      fontFamily: "Lato-Regular",
      fontSize: width < 380 ? 18 : 24,
      color: colorBlue,
    },
    textSteps: {
      fontFamily: "Lato-Regular",
      fontSize: width < 380 ? 14 : 18,
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
