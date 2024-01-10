import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import LinearGradientBody from "../components/LinearGradienBodyt";
import Header from "../components/Header";
import useStyles from "../styles/main";
import { BarCodeScanner } from "expo-barcode-scanner";
import useScan from "../hooks/useScan";
import ScanButton from "../components/ScanButton";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import useScreen from "../hooks/useScreen";
import scanStyles from "../styles/scanStyles";

const Scan = ({ navigation }) => {
  const styles = useStyles();
  const [cameraPermission, setCameraPermission] = useState(false);
  const { setScanned, scanned, setScanInfo } = useScan();
  const screenRoute = useRoute();
  const { setScreen, screen } = useScreen();
  let screenName = screenRoute.name;

  const unsubscribe = useCallback(() => {
    const tabPress = navigation.addListener("tabPress", (e) => {
      if (screen != "scan") {
        setScanned(true);
      }
    });

    return () => {
      tabPress();
    };
  }, [navigation]);

  useEffect(() => {
    setScreen(screenName);
  }, [navigation]);

  useEffect(() => {
    askPermissionForCamera();
  }, []);

  useFocusEffect(() => {
    unsubscribe();
  });

  const askPermissionForCamera = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setCameraPermission(status === "granted");
  };

  return (
    <LinearGradientBody>
      <Header />
      <View style={styles.container}>
        {(scanned === false && cameraPermission) && (
          <View style={scanStyles.qrCodeScanerView}>
            <BarCodeScanner
              onBarCodeScanned={
                scanned
                  ? undefined
                  : ({ data }) => {
                      setScanInfo(data);
                      setScanned(true);
                      navigation.navigate("suivi");
                    }
              }
              style={scanStyles.qrCodeScaner}
            />
          </View>
        )}
        {scanned && <ScanButton />}
      </View>
    </LinearGradientBody>
  );
};

export default Scan;
