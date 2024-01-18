import React, { useRef, useState } from "react";
import FormContainer from "../components/FormContainer";
import FormTitle from "../components/FormTitle";
import DropDownLists from "../components/DropDownLists";
import printIcon from "../assets/png/imprimante.png";
import useAuth from "../hooks/useAuth";
import useQRCodeForm from "../hooks/useQRCodeForm";
import QRCode from "react-native-qrcode-svg";
import { Platform, View } from "react-native";
import ViewShot from "react-native-view-shot";
import * as FileSystem from "expo-file-system";
import { PermissionsAndroid } from "react-native";

const PrintQRCode = () => {
  const { auth } = useAuth();
  const [printer, setPrinter] = useState();
  const { productAdded } = useQRCodeForm();
  const viewShotRef = useRef(null);

  const handleDownloadQrCode = async () => {
    try {
      const date = new Date();
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED)
          alert("Permission denied");
      }
      await viewShotRef.current.capture().then(async (uri) => {
        const fileName =
          "qrcode-" +
          `${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
        if (Platform.OS === "android") {
          const permissions =
            await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
          if (permissions.granted) {
            const base64 = await FileSystem.readAsStringAsync(uri, {
              encoding: FileSystem.EncodingType.Base64,
            });
            await FileSystem.StorageAccessFramework.createFileAsync(
              permissions.directoryUri,
              fileName,
              "image/png"
            ).then(async (uri) => {
              await FileSystem.writeAsStringAsync(uri, base64, {
                encoding: FileSystem.EncodingType.Base64,
              }).catch((e) => console.log(e));
            });
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <FormContainer text="Imprimer" onPress={() => handleDownloadQrCode()}>
      <FormTitle title="Impression" />
      <DropDownLists
        data={[{ label: "Canon 3", value: 1 }]}
        icon={printIcon}
        text="Sélectionnez l'imprimante"
        label="Imprimante"
        value={printer}
        setValue={setPrinter}
      />
      <View
        style={{
          alignItems: "center",
          marginTop: 5,
        }}
      >
        <ViewShot options={{ format: "png", quality: 1.0 }} ref={viewShotRef}>
          <View style={{backgroundColor: "white", padding: 8}}>
            <QRCode
              value={`${auth.email},${productAdded}`}
              size={175}
              logoMargin={10}
            />
          </View>
        </ViewShot>
      </View>
    </FormContainer>
  );
};

export default PrintQRCode;
