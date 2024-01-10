import React, { useEffect } from "react";
import { View, Text } from "react-native";
import LinearGradientBody from "../components/LinearGradienBodyt";
import Header from "../components/Header";
import useStyles from "../styles/main";
import QRCode from "react-native-qrcode-svg";
import useAuth from "../hooks/useAuth";
import { useRoute } from "@react-navigation/native";
import NavigationStackQRCodeGenerator from "../navigation/NavigationStackQRCodeGenerator";
import useScreen from "../hooks/useScreen";

const QrCode = ({ navigation }) => {
  const styles = useStyles();
  const { auth } = useAuth();
  const screenRoute = useRoute();
  const { setScreen } = useScreen();
  let screenName = screenRoute.name;

  useEffect(() => {
    setScreen(screenName);
  }, [navigation]);

  return <NavigationStackQRCodeGenerator />;
};

export default QrCode;
