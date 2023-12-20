import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useWindowDimensions } from "react-native";

const useStyles = () => {
  const { width, height } = useWindowDimensions();

  return StyleSheet.create({
    body: {
      flex: 1,
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
      fontFamily: "Lato-Regular",
    },
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
    },
    screen: {
      position: "relative",
      height: height > 700 ? 600 : 450,
      width: 360,
      // height: hp(75),
      // width: wp(95),
      elevation: 1,
      borderStyle: "solid",
    },
    screenContent: {
      zIndex: 1,
      position: "relative",
      height: "100%",
    },
    login: {
      width: 320,
      padding: height > 700 ? 10 : 30,
      paddingTop: height > 700 ? 170 : 150,
    },
    loginField: {
      paddingTop: height > 700 ? 20 : 0,
      paddingLeft: 20,
      position: "relative",
    },
    logoLogin: {
      width: 100,
      height: 100,
      top: -120,
      left: 20,
      marginBottom: -80,
    },
    loginIcon: {
      position: "absolute",
      top: height > 700 ? 31 : 12.5,
      left: 16,
      width: height > 700 ? 26 : 22,
      height: height > 700 ? 26 : 22,
      tintColor: "#E94A12",
    },
    loginInput: {
      fontSize: height > 700 ? 22 : 16,
      borderBottomWidth: 2,
      borderBottomColor: "#A2A2A2",
      borderStyle: "solid",
      padding: 10,
      paddingLeft: height > 700 ? 30 : 24,
      fontWeight: "700",
      width: "75%",
      color: "#A2A2A2",
    },
    loginSubmit: {
      backgroundColor: "#ffffff",
      marginTop: height > 700 ? 75 : 50,
      paddingLeft: 16,
      paddingTop: 10,
      paddingBottom: 10,
      borderRadius: 26,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "#D4D3E8",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      elevation: 5,
    },
    buttonText: {
      position: "relative",
      fontWeight: "700",
      color: "#E94A12",
      textTransform: "uppercase",
      fontSize: height > 700 ? 24 : 18,
    },
    buttonIcon: {
      marginLeft: "auto",
      tintColor: "#E94A12",
      width: height > 700 ? 38 : 30,
      height: height > 700 ? 38 : 30,
    },
    screenBg: {
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 0,
      overflow: "hidden",
    },
    screenBgShape: {
      transform: "rotate(45deg)",
      position: "absolute",
    },
    screenBgShape1: {
      height: height > 700 ? 600 : 450,
      width: height > 700 ? 600 : 450,
      backgroundColor: "#ffffff",
      top: -50,
      right: 120,
      borderTopRightRadius: 72,
    },
    screenBgShape2: {
      height: 200,
      width: 200,
      backgroundColor: "#2157A1",
      top: -172,
      right: 0,
      borderRadius: 32,
    },
    screenBgShape3: {
      height: 450,
      width: 190,
      top: -10,
      left: 200,
      borderRadius: 32,
      zIndex: -10,
    },
    screenBgShape4: {
      height: 400,
      width: 200,
      backgroundColor: "#3799B8",
      top: 350,
      right: -20,
      borderRadius: 60,
    },
    textError: {
      color: "red",
      fontWeight: "700",
      fontSize: 16,
    },
    boxShadow: {
      shadowColor: "#333333",
      shadowOffset: {
        width: 6,
        height: 6,
      },
      shadowRadius: 4,
      shadowOpacity: 0.3,
    },
  });
};

export default useStyles;
