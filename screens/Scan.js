import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import LinearGradientBody from "../components/LinearGradienBody";
import Header from "../components/Header";
import useStyles from "../styles/main";
import { BarCodeScanner } from "expo-barcode-scanner";
import useScan from "../hooks/useScan";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import useScreen from "../hooks/useScreen";
import useScanStyles from "../styles/scanStyles";
import useSuivi from "../hooks/useSuivi";
import useAxiosPrivate from "../hooks/usePrivateAxios";
import useFiche from "../hooks/useFiche";
import { useLoading } from "../hooks/useLoading";
import useProblem from "../hooks/useProblem";
import ReactButton from "../components/ReactButton";
import scanerIcon from "../assets/png/scan.png";
import useHeaderStyles from "../styles/headerStyles";
import useChart from "../hooks/useChart";

const Scan = ({ navigation }) => {
  const styles = useStyles();
  const scanStyles = useScanStyles();
  const [cameraPermission, setCameraPermission] = useState(false);
  const { setScanned, scanned, setScanInfo } = useScan();
  const { setSuivis } = useSuivi();
  const { setProblems } = useProblem();
  const screenRoute = useRoute();
  const { setScreen, screen } = useScreen();
  const { setFiche, setPdf } = useFiche();
  const axiosPrivate = useAxiosPrivate();
  const { setLoading } = useLoading();
  const { setYears, setStatProducts, setStatProblems } = useChart();
  const headerStyles = useHeaderStyles();
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
                      if (!scanned) {
                        try {
                          setLoading(true);
                          const res = await axiosPrivate.post(
                            "/suivi/getByProduct",
                            { email: arrayData[0], id: arrayData[1] }
                          );
                          if (res.data.success) {
                            setLoading(false);
                            setSuivis(res.data.suivis);
                            setFiche(res.data.product);
                            setPdf(res.data.pdf);
                            setScanInfo(data);
                            setProblems(res.data.problems);
                            setYears(res.data.years);
                            setStatProducts(res.data.statProducts);
                            setStatProblems(res.data.statProblems);
                            setScanned(true);
                            navigation.navigate("suivi");
                          } else {
                            setLoading(false);
                          }
                        } catch (error) {
                          setScanned(true);
                          setLoading(false);
                        }
                      }
                    }
              }
              style={scanStyles.qrCodeScaner}
            />
          </View>
        )}
        {scanned && (
          <ReactButton
            onPress={() => setScanned(false)}
            touchableStyle={scanStyles.scanButton}
            viewStyle={[
              headerStyles.logoutButtonView,
              scanStyles.scanButtonView,
            ]}
            iconStyle={scanStyles.scanButtonIcon}
            textStyle={[
              headerStyles.logoutButtonText,
              scanStyles.scanButtonText,
            ]}
            text="Scanner"
            icon={scanerIcon}
          />
        )}
      </View>
    </LinearGradientBody>
  );
};

export default Scan;
