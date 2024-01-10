import React, { useState } from "react";
import LoginInput from "../components/LoginInput";
import DropDownTypeLists from "../components/DropDownTypeLists";

const NewProductForm = () => {
  const [dimension, setDimension] = useState();
  const [errors, setErrors] = useState();

const validate = () => {
    let errors = {}
    if(!dimension){
        errors.dimension = "Veuillez mettre l'hauteur et le largeur"
    }
    setErrors(errors)
}

  return (
    <>
      <DropDownTypeLists />
      <LoginInput
        value={dimension}
        icon={null}
        secure={false}
        onChange={setDimension}
        placeholder="Hauteur et Largeur"
        errors={errors?.dimension}
      />
    </>
  );
};

export default NewProductForm;
