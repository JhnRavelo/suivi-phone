import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import LinearGradientBody from "../components/LinearGradienBody";
import Header from "../components/Header";
import useStyles from "../styles/main";
import { BarCodeScanner } from "expo-barcode-scanner";
import useScan from "../hooks/useScan";
import ScanButton from "../components/ScanButton";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import useScreen from "../hooks/useScreen";
import useScanStyles from "../styles/scanStyles";
import useSuivi from "../hooks/useSuivi";
import useAxiosPrivate from "../hooks/usePrivateAxios";

const Scan = ({ navigation }) => {
  const styles = useStyles();
  const scanStyles = useScanStyles()
  const [cameraPermission, setCameraPermission] = useState(false);
  const { setScanned, scanned, setScanInfo } = useScan();
  const { setSuivis } = useSuivi();
  const screenRoute = useRoute();
  const { setScreen, screen } = useScreen();
  const axiosPrivate = useAxiosPrivate();
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
        {scanned === false && cameraPermission && (
          <View style={scanStyles.qrCodeScanerView}>
            <BarCodeScanner
              onBarCodeScanned={
                scanned
                  ? undefined
                  : async ({ data }) => {
                      let arrayData = data.split(",");
                      try {
                        const res = await axiosPrivate.post(
                          "/suivi/getByProduct",
                          { email: arrayData[0], id: arrayData[1] }
                        );
                        if (res.data.success) {
                          setSuivis(res.data.suivis);
                          setScanInfo(data);
                          setScanned(true);
                          navigation.navigate("suivi");
                        }
                      } catch (error) {
                        console.log(error);
                      }
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
