import React from "react";
import FormContainer from "../components/FormContainer";
import VerifyText from "../components/VerifyText";
import useQRCodeForm from "../hooks/useQRCodeForm";
import FormTitle from "../components/FormTitle";
import useAxiosPrivate from "../hooks/usePrivateAxios";
import { StackActions } from "@react-navigation/native";

const VerifyProductForm = ({ navigation }) => {
  const { dataQRCodeVerify, formDataQRCode, setProductAdded } = useQRCodeForm();
  const axiosPrivate = useAxiosPrivate();

  const handleClick = async () => {
    try {
      const res = await axiosPrivate.post("/product", formDataQRCode);
      if (res.data.success) {
        setProductAdded(res.data.product);
        navigation.dispatch(StackActions.replace("printQRCode"));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormContainer text="Vérifier" onPress={handleClick}>
      <FormTitle title="Vérification" />
      <VerifyText items={dataQRCodeVerify} />
    </FormContainer>
  );
};

export default VerifyProductForm;
