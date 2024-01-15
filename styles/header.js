import { StatusBar, StyleSheet } from "react-native";
import { useWindowDimensions } from "react-native";

const useHeaderStyles = () => {
  const { width, height } = useWindowDimensions();
  return StyleSheet.create({
    headerContainer: {
      marginTop: height > 700 ? StatusBar.currentHeight : 0,
      display: 'flex',
      flexDirection: "column",
      justifyContent: "center"
    },
    logoutButton: {
      left: height > 700 ? 280 : 250,
      top: height > 700 ? -14 : -4,
    },
    logoutButtonView: {
      elevation: 10,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 110,
      height: height > 700 ? 40 : 35,
      borderRadius: 3,
      backgroundColor: "#E4570F",
    },
    logoutButtonText: {
      color: "#fff",
      fontWeight: "700",
      fontSize: height > 700 ? 17 : 16,
      fontFamily: "Lato-Regular",
    },
    logo: {
      width: height > 700 ? 135 : 105,
      height: height > 700 ? 50 : 35,
      top: 30,
      left: 20,
      resizeMode: "contain"
    },
  });
};

export default useHeaderStyles;
