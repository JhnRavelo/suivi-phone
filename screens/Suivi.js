import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import styles from "../styles/main";
import LinearGradientBody from "../components/LinearGradienBodyt";
import Header from "../components/Header";
import useStyles from "../styles/main";
import useScan from "../hooks/useScan";

const Suivi = () => {
  const {scanInfo, setScanned, scanned} = useScan()
  const styles = useStyles()
  const [scanData, setScanData] = useState()

// useEffect(()=>{
//   if(scanned && scanData != scanInfo){
//     setScanned(false)
//     setScanData(scanInfo)
//     console.log("suivi", scanned)
//   }
// }, [scanned])

  return (
    <LinearGradientBody>
      <Header />
      <View style={styles.container}>
        <Text>{scanInfo ? scanInfo : ""}</Text>
      </View>
    </LinearGradientBody>
  );
};

export default Suivi;