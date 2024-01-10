import React from "react";
import { View, Text } from "react-native";
import LinearGradientBody from "../components/LinearGradienBodyt";
import Header from "../components/Header";
import useStyles from "../styles/main";
import QRCode from "react-native-qrcode-svg";
import useAuth from "../hooks/useAuth";

const QrCode = () => {
  const styles = useStyles();
  const { auth } = useAuth();
  return (
    <LinearGradientBody>
      <Header />
      <View style={[styles.container, {marginBottom: 50,}]}>
        {/* <QRCode value={`email: ${auth.email}\nvaleur: 1`} size={250} logoMargin={10}/> */}
      </View>
    </LinearGradientBody>
  );
};

export default QrCode;
