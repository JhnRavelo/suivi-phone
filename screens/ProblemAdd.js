import React from "react";
import FormContainer from "../components/FormContainer";
import FormTitle from "../components/FormTitle";
import MultiLineInput from "../components/MultiLineInput";

const ProblemAdd = () => {
  return (
    <FormContainer screen="step">
      <FormTitle title="Problème" />
      <MultiLineInput placeholder="Problème"/>
    </FormContainer>
  );
};

export default ProblemAdd;
