// import DropDownLists from "../components/DropDownLists";
// import printIcon from "../assets/png/imprimante.png";
// import ViewShot from "react-native-view-shot";
// import * as FileSystem from "expo-file-system";
// import * as Clipboard from "expo-clipboard";
// import copieIcon from "../assets/png/copie.png";
// import cocheIcon from "../assets/png/coche.png";
import React from "react";
import FormContainer from "../components/FormContainer";
import FormTitle from "../components/FormTitle";
import useQRCodeForm from "../hooks/useQRCodeForm";
import QRCode from "react-native-qrcode-svg";
import { View } from "react-native";
import usePrintStyles from "../styles/printStyles";
import usePrint from "../hooks/usePrint";

const PrintQRCode = () => {
  // const [printer, setPrinter] = useState();
  // const [copie, setCopie] = useState(false);
  // const viewShotRef = useRef(null);
  const { productAdded } = useQRCodeForm();
  const styles = usePrintStyles();
  const print = usePrint();

  // const handleDownloadQrCode = async () => {
  //   try {
  //     const date = new Date();
  //     await viewShotRef.current.capture().then(async (uri) => {
  //       const fileName =
  //         "qrcode-" +
  //         `${date.getDate()}-${
  //           date.getMonth() + 1
  //         }-${date.getFullYear()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
  //       if (Platform.OS === "android") {
  //         const permissions =
  //           await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
  //         if (permissions.granted) {
  //           const base64 = await FileSystem.readAsStringAsync(uri, {
  //             encoding: FileSystem.EncodingType.Base64,
  //           });
  //           await FileSystem.StorageAccessFramework.createFileAsync(
  //             permissions.directoryUri,
  //             fileName,
  //             "image/png"
  //           ).then(async (uri) => {
  //             await FileSystem.writeAsStringAsync(uri, base64, {
  //               encoding: FileSystem.EncodingType.Base64,
  //             }).catch((e) => console.log(e));
  //           });
  //         }
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleCopie = async () => {
  //   await Clipboard.setStringAsync(`${auth.email},${productAdded}`);
  //   setCopie(!copie);
  // };

  return (
    <FormContainer text="Imprimer" onPress={() => print(productAdded)}>
      <FormTitle title="Produit Ajouté" />
      {/* <DropDownLists
        data={[{ label: "Canon 3", value: 1 }]}
        icon={printIcon}
        text="Sélectionnez l'imprimante"
        label="Imprimante"
        value={printer}
        setValue={setPrinter}
      /> */}
      <View style={styles.copieContainerStyle}>
        {/* <View style={styles.copieContentStyle}>
          <Text
            style={styles.copieTextStyle}
          >{`${auth.email},${productAdded}`}</Text>
          <TouchableOpacity onPress={() => handleCopie()}>
            <Image
              source={copie ? cocheIcon : copieIcon}
              style={[
                styles.copieImgStyle,
                !copie ? { tintColor: "#1C2B39" } : null,
              ]}
            />
          </TouchableOpacity>
        </View> */}
        {/* <ViewShot options={{ format: "png", quality: 1.0 }} ref={viewShotRef}> */}
        <View style={{ backgroundColor: "white", padding: 8, marginTop: 15 }}>
          <QRCode value={`${productAdded}`} size={175} />
        </View>
        {/* </ViewShot> */}
      </View>
    </FormContainer>
  );
};

export default PrintQRCode;
