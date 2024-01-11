import React, { useState } from "react";
import LoginInput from "../components/LoginInput";
import DropDownTypeLists from "../components/DropDownLists";
import useQRCodeForm from "../hooks/useQRCodeForm";
import FormContainer from "../components/FormContainer";
import charpentIcon from "../assets/png/charpenterie.png";

const dimensionRegex = /^\d+\*\d+$/;

const NewProductForm = ({ navigation }) => {
  const [dimension, setDimension] = useState();
  const [devis, setDevis] = useState();
  const [location, setLocation] = useState();
  const [detail, setDetail] = useState("");
  const [type, setType] = useState();
  const [errors, setErrors] = useState({});
  const { setFormDataQRCode, setDataQRCodeVerify, productTypes } =
    useQRCodeForm();

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
      formData.append("detail", detail);
      formData.append("location", location);

      setFormDataQRCode(formData);

      const selectedProductType = productTypes.find(
        (item) => item.value == type
      );

      setDataQRCodeVerify([
        { label: "Type", value: selectedProductType?.label },
        { label: "Hauteur et Largeur", value: dimension },
        { label: "Dévis", value: devis },
        { label: "Détails", value: detail },
        { label: "Emplacement", value: location },
      ]);

      navigation.navigate("verifyProduct");
    }
  };

  return (
    <>
      <FormContainer text="Enregistrer" onPress={handleClick}>
        <DropDownTypeLists
          value={type}
          setValue={setType}
          error={errors?.type}
          icon={charpentIcon}
          text="Sélectionnez le type de menuiserie"
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
