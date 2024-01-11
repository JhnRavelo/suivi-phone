import React from "react";
import FormContainer from "../components/FormContainer";
import printIcon from "../assets/png/imprimante.png";
import VerifyText from "../components/VerifyText";
import useQRCodeForm from "../hooks/useQRCodeForm";
import FormTitle from "../components/FormTitle";

const VerifyProductForm = () => {
  const { dataQRCodeVerify } = useQRCodeForm();

  return (
    <FormContainer text="Vérifier">
      <FormTitle title="Vérification"/>
      <VerifyText items={dataQRCodeVerify} />
    </FormContainer>
  );
};

export default VerifyProductForm;
