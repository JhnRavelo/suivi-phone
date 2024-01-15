import { StatusBar, StyleSheet } from "react-native";
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
      marginTop: StatusBar.currentHeight + 20,
      position: "relative",
      // height: height > 700 ? 600 : 450,
      // width: 360,
      height: hp(100),
      width: wp(100),
      elevation: 1,
      borderStyle: "solid",
    },
    screenContent: {
      zIndex: 1,
      position: "relative",
      height: "100%",
    },
    login: {
      // width: 320,
      padding: height > 700 ? 10 : 30,
      // paddingTop: height > 700 ? 170 : 150,
      width: wp(90),
      // height: hp(50),
      paddingTop: hp(35),
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
      width: "80%",
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
      // height: height > 700 ? 800 : 550,
      // width: height > 700 ? 800 : 550,
      height: height > 700 ? hp(140) : hp(150),
      width: height > 700 ? wp(180) : wp(150),
      backgroundColor: "#ffffff",
      top: height > 700 ? hp(-2) : hp(-8),
      right: height > 700 ? 330 : 250,
      borderTopRightRadius: height > 700 ? 80 : 72,
      zIndex: 1,
    },
    screenBgShape2: {
      height: 200,
      width: 200,
      backgroundColor: "#2157A1",
      top: height > 700 ? -140 : -172,
      right: height > 700 ? 0 : 0,
      borderRadius: 32,
    },
    screenBgShape3: {
      height: 450,
      width: height > 700 ? 260 : 190,
      top: height > 700 ? 5 : -10,
      left: height > 700 ? 320 : 210,
      borderRadius: 32,
      zIndex: -10,
    },
    screenBgShape4: {
      height: height > 700 ? 460 : 400,
      width: height > 700 ? 270 : 200,
      backgroundColor: "#3799B8",
      top: height > 700 ? 540 : 240,
      right: height > 700 ? -100 : -120,
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
