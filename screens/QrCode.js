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

const QrCode = ({navigation}) => {
  const styles = useStyles();
  const { auth } = useAuth();
  const screenRoute = useRoute();
  const { setScreen, screen } = useScreen();
  let screenName = screenRoute.name;

  useEffect(()=>{   
    setScreen(screenName);
  }, [navigation])
  return (
    <LinearGradientBody>
      <Header />
      <View style={[styles.container, {marginBottom: 50,}]}>
          <View style={{backgroundColor: "color", width: 360, height: 500, borderRadius: 15, top: 120, left: 20}} >
            <NavigationStackQRCodeGenerator />
          </View>
        {/* <QRCode value={`email: ${auth.email}\nvaleur: 1`} size={250} logoMargin={10}/> */}
      </View>
    </LinearGradientBody>
  );
};

export default QrCode;
