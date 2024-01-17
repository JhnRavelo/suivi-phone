import { StyleSheet, useWindowDimensions } from "react-native";

const useScanStyles = () => {
  const { witdh, height } = useWindowDimensions();
  return StyleSheet.create({
    scanButton: {
      display: "flex",
      alignItems: "center",
    },
    scanButtonView: {
      width: "auto",
      height: "auto",
      backgroundColor: "#1C2B39",
      padding: height > 700 ? 12 : 7,
      top: height > 700 ? -30 : 0,
    },
    scanButtonText: {
      fontSize: height > 700 ? 34 : 30,
    },
    scanButtonIcon: {
      width: 150,
      height: 150,
      tintColor: "white",
      marginBottom: height > 700 ? -8 : -10,
    },
    qrCodeScanerView: {
      width: height > 700 ? 320 : 280,
      height: height > 700 ? 320 : 280,
      overflow: "hidden",
      alignItems: "center",
      top: -40,
      borderColor: "white",
      borderWidth: 5,
    },
    qrCodeScaner: {
      height: 900,
      width: 600,
      minWidth: 600,
      left: 0,
      zIndex: 10,
    },
  });
};

export default useScanStyles;
