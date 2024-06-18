import React, { useState } from "react";
import Input from "../components/Input";
import DropDownTypeLists from "../components/DropDownLists";
import useQRCodeForm from "../hooks/useQRCodeForm";
import FormContainer from "../components/FormContainer";
import charpentIcon from "../assets/png/charpenterie.png";
import FormTitle from "../components/FormTitle";
import useLocation from "../hooks/useLocation";
import useGetLocation from "../hooks/useGetLocation";
import { useLoading } from "../hooks/useLoading";

const dimensionRegex = /^\d+\*\d+$/;

const NewProductForm = ({ navigation }) => {
  const [dimension, setDimension] = useState();
  const [devis, setDevis] = useState();
  const [detail, setDetail] = useState("");
  const [type, setType] = useState();
  const [client, setClient] = useState();
  const [chantier, setChantier] = useState();
  const [errors, setErrors] = useState({});
  const { setLoading } = useLoading();
  const { setFormDataQRCode, setDataQRCodeVerify, productTypes } =
    useQRCodeForm();
  const { statusLocation } = useLocation();
  const getLocation = useGetLocation(statusLocation);

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
    if (!type) {
      error.type = "Veuillez choisir le type de ménuiserie";
    }
    if (!client) {
      error.client = "Veuillez mettre le client";
    }
    if (!chantier) {
      error.chantier = "Veuillez mettre le chantier";
    }
    setErrors(error);
    return Object.keys(error).length === 0;
  };

  const handleClick = async () => {
    const isValid = validate();
    let formData = {};
    if (isValid) {
      setLoading(true);
      const location = await getLocation();
      formData.type = type;
      formData.dimension = dimension;
      formData.devis = devis;
      formData.detail = detail;
      formData.location = location;
      formData.client = client;
      formData.chantier = chantier;

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
        { label: "Client", value: client },
        { label: "Chantier", value: chantier },
      ]);
      setLoading(false);
      navigation.navigate("verifyProduct");
    }
  };

  return (
    <FormContainer text="Enregistrer" onPress={handleClick}>
      <FormTitle title="Nouveau Produit" />
      <DropDownTypeLists
        value={type}
        setValue={setType}
        error={errors?.type}
        icon={charpentIcon}
        text="Sélectionnez le type de ménuiserie"
        data={productTypes}
        label="Type de ménuiserie"
      />
      <Input
        value={dimension}
        icon={null}
        secure={false}
        onChange={setDimension}
        placeholder="Hauteur et Largeur"
        errors={errors?.dimension}
        type="input"
      />
      <Input
        value={devis}
        icon={null}
        secure={false}
        onChange={setDevis}
        placeholder="Devis"
        errors={errors?.devis}
        type="input"
      />
      <Input
        value={detail}
        icon={null}
        secure={false}
        onChange={setDetail}
        placeholder="Détails"
        errors={errors?.detail}
        type="input"
      />
      <Input
        value={chantier}
        icon={null}
        secure={false}
        onChange={setChantier}
        placeholder="Chantier"
        errors={errors?.chantier}
        type="input"
      />
      <Input
        value={client}
        icon={null}
        secure={false}
        onChange={setClient}
        placeholder="Client"
        errors={errors?.client}
        type="input"
      />
    </FormContainer>
  );
};

export default NewProductForm;
