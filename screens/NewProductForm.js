import React, { useState } from "react";
import LoginInput from "../components/LoginInput";
import DropDownTypeLists from "../components/DropDownTypeLists";
import useStyles from "../styles/main";
import useQRCodeForm from "../hooks/useQRCodeForm";
import FormContainer from "../components/FormContainer";

const dimensionRegex = /^\d+\*\d+$/;

const NewProductForm = () => {
  const styles = useStyles();
  const [dimension, setDimension] = useState();
  const [devis, setDevis] = useState();
  const [location, setLocation] = useState();
  const [detail, setDetail] = useState("");
  const [type, setType] = useState();
  const [errors, setErrors] = useState({});
  const { setFormDataQRCode } = useQRCodeForm();

  const validate = () => {
    let error = {};
    if (!dimension) {
      error.dimension = "Veuillez mettre l'hauteur et le largeur";
    } else if (!dimensionRegex.test(dimension)) {
      error.dimension = "De la forme hauteur*largeur";
    }
    if (!devis) {
      error.devis = "Veuillez mettre le devis";
    }
    if (!location) {
      error.location = "Veuillez mettre l'emplacement";
    }
    if (!type) {
      error.type = "Veuillez choisir le type de ménuiserie";
    }
    setErrors(error);
    return Object.keys(error).length === 0;
  };

  const handleClick = () => {
    const isValid = validate();
    let formData = new FormData();

    if (isValid) {
      formData.append("type", type);
      formData.append("dimension", dimension);
      formData.append("devis", devis);
      formData.append("details", detail);
      formData.append("location", location);

      setFormDataQRCode(formData);
    }
  };

  return (
    <>
      <FormContainer text="Enregistrer" onPress={handleClick}>
        <DropDownTypeLists
          value={type}
          setValue={setType}
          error={errors?.type}
        />
        <LoginInput
          value={dimension}
          icon={null}
          secure={false}
          onChange={setDimension}
          placeholder="Hauteur et Largeur"
          errors={errors?.dimension}
          type="input"
        />
        <LoginInput
          value={devis}
          icon={null}
          secure={false}
          onChange={setDevis}
          placeholder="Devis"
          errors={errors?.devis}
          type="input"
        />
        <LoginInput
          value={location}
          icon={null}
          secure={false}
          onChange={setLocation}
          placeholder="Emplacement"
          errors={errors?.location}
          type="input"
        />
        <LoginInput
          value={detail}
          icon={null}
          secure={false}
          onChange={setDetail}
          placeholder="Détails"
          errors={errors?.detail}
          type="input"
        />
      </FormContainer>
      {/* <QRCode value={`email: ${auth.email}\nvaleur: 1`} size={250} logoMargin={10}/> */}
    </>
  );
};

export default NewProductForm;
