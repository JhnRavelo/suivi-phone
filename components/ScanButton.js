import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import useScan from "../hooks/useScan";
import scanerIcon from "../assets/png/scan.png";
import useHeaderStyles from "../styles/header";
import useScanStyles from "../styles/scanStyles"

const ScanButton = () => {
  const headerStyles = useHeaderStyles()
  const scanStyles = useScanStyles()
  const { setScanned } = useScan();
  return (
    <TouchableOpacity
      style={scanStyles.scanButton}
      onPress={() => setScanned(false)}
    >
      <View style={[headerStyles.logoutButtonView, scanStyles.scanButtonView]}>
        <Image
          source={scanerIcon}
          resizeMode="contain"
          style={scanStyles.scanButtonIcon}
        />
        <Text
          style={[headerStyles.logoutButtonText, scanStyles.scanButtonText]}
        >
          Scanner
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ScanButton;
