import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import styles from "../styles/main";
import LinearGradientBody from "../components/LinearGradienBody";
import Header from "../components/Header";
import useStyles from "../styles/main";
import useScan from "../hooks/useScan";
import useScreen from "../hooks/useScreen";
import { useRoute } from "@react-navigation/native";
import TableSuivi from "./TableSuivi";

const Suivi = ({ navigation }) => {
  const { scanInfo, setScanned, scanned } = useScan();
  const styles = useStyles();
  const [scanData, setScanData] = useState();
  const screenRoute = useRoute();
  const { setScreen } = useScreen();
  let screenName = screenRoute.name;
  useEffect(() => {
    setScreen(screenName);
  }, [navigation]);

  return (
    <LinearGradientBody>
      <Header />
      <View style={styles.container}>
        <TableSuivi />
      </View>
    </LinearGradientBody>
  );
};

export default Suivi;
