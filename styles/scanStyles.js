import { StyleSheet } from "react-native";

const scanStyles = StyleSheet.create({
  scanButton: {
    display: "flex",
    alignItems: "center",
  },
  scanButtonView: {
    width: "auto",
    height: "auto",
    backgroundColor: "#1C2B39",
    padding: 7,
  },
  scanButtonText: {
    fontSize: 30,
  },
  scanButtonIcon: {
    width: 100,
    height: 100,
    tintColor: "white",
    marginBottom: -10,
  },
  qrCodeScanerView: {
    width: 300,
    height: 300,
    overflow: "hidden",
    alignItems: "center",
    top: -40,
    borderColor: "white",
    borderWidth: 5,
  },
  qrCodeScaner: {
    height: 700,
    width: 500,
    minWidth: 500,
    left: 0,
    zIndex: 10,
  },
});

export default scanStyles;
