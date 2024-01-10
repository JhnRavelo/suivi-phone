import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import LinearGradientBody from "../components/LinearGradienBodyt";
import Header from "../components/Header";
import useStyles from "../styles/main";
import { BarCodeScanner } from "expo-barcode-scanner";
import useScan from "../hooks/useScan";
// import QRCodeScanner from "react-native-qrcode-scanner";
import ScanButton from "../components/ScanButton";

const Scan = ({ navigation }) => {
  const styles = useStyles();
  const [cameraPermission, setCameraPermission] = useState(false);
  const { setScanned, scanned, setScanInfo } = useScan();
  // const [scan, setScan] = useState(false);

  useEffect(() => {
    askPermissionForCamera();
  }, []);

  const askPermissionForCamera = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setCameraPermission(status === "granted");
  };

  return (
    <LinearGradientBody>
      <Header />
      <View style={styles.container}>
        {scanned === false && (
          <BarCodeScanner
            onBarCodeScanned = {
              scanned
                ? undefined
                : ({ data }) => {
                    setScanInfo(data);
                    setScanned(true);
                    navigation.navigate("suivi");
                  }
            }
            // style={StyleSheet.absoluteFill}
            style = {{
              height: 350,
              width: 50,
              minWidth: 300,
              top: -30,
              left: 0,
              zIndex: 10,
            }}
          />
        )}
        <ScanButton />

        {/* <QRCodeScanner  
          showMarker={true}
          reactivate={true}
          onRead={({ data }) => alert(data)}
          reactivateTimeout={1000}
        /> */}
      </View>
    </LinearGradientBody>
  );
};

export default Scan;
