import React from "react";
import FormContainer from "../components/FormContainer";
import VerifyText from "../components/VerifyText";
import useQRCodeForm from "../hooks/useQRCodeForm";
import FormTitle from "../components/FormTitle";
import useAxiosPrivate from "../hooks/usePrivateAxios";
import { StackActions } from "@react-navigation/native";
import { useLoading } from "../hooks/useLoading";

const VerifyProductForm = ({ navigation }) => {
  const { dataQRCodeVerify, formDataQRCode, setProductAdded } = useQRCodeForm();
  const { setLoading } = useLoading();
  const axiosPrivate = useAxiosPrivate();

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await axiosPrivate.post("/product", formDataQRCode);
      if (res.data.success) {
        setLoading(false);
        setProductAdded(res.data.product);
        navigation.dispatch(StackActions.replace("printQRCode"));
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <FormContainer text="Vérifier" onPress={handleClick}>
        <FormTitle title="Vérification" />
        <VerifyText
          items={dataQRCodeVerify}
          containerStyle={{ marginTop: 20, paddingVertical: 10 }}
        />
      </FormContainer>
    </>
  );
};

export default VerifyProductForm;
