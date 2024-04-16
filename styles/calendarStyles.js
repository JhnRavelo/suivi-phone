import { StyleSheet, useWindowDimensions } from "react-native";

const useCalendarStyles = () => {
  const {width} = useWindowDimensions()
  return StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      backgroundColor: "white",
      borderRadius: 10,
      padding: 20,
      width: "80%",
    },
    yearPicker: {
      marginBottom: 5,
      width: width < 380 ? "45%" : "40%",
    },
    btnText: {
      color: "blue",
      marginTop: 20,
      fontSize: 18,
      marginRight: 20,
    },
  });
};

export default useCalendarStyles;
