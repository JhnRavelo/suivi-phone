import React from "react";
import FormContainer from "../components/FormContainer";
import FormTitle from "../components/FormTitle";
import DropDownLists from "../components/DropDownLists";
import printIcon from "../assets/png/imprimante.png";
import useAuth from "../hooks/useAuth";
import useQRCodeForm from "../hooks/useQRCodeForm";
import QRCode from "react-native-qrcode-svg";
import { View } from "react-native";

const PrintQRCode = () => {
  const { auth } = useAuth();
  const { productAdded } = useQRCodeForm();
  return (
    <FormContainer text="Imprimer">
      <FormTitle title="Impression" />
      <DropDownLists
        data={[{ label: "Canon 3", value: 1 }]}
        icon={printIcon}
        text="Sélectionnez l'imprimante"
        label="Imprimante"
      />
      <View style={{alignItems: "center", marginTop: 10}}>
        <QRCode
          value={`${auth.email},${productAdded}`}
          size={175}
          logoMargin={10}
        />
      </View>
    </FormContainer>
  );
};

export default PrintQRCode;
