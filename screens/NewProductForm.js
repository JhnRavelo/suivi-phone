import React, { useState } from "react";
import LoginInput from "../components/LoginInput";
import DropDownTypeLists from "../components/DropDownTypeLists";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import LinearGradientBody from "../components/LinearGradienBodyt";
import Header from "../components/Header";
import useStyles from "../styles/main";
import AppButton from "../components/Button";
import useQRCodeForm from "../hooks/useQRCodeForm";

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

      console.log(formData);

      setFormDataQRCode(formData);
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <LinearGradientBody>
          <Header />
          <View style={styles.container}>
            <View
              style={{
                backgroundColor: "#fff",
                width: 350,
                height: 400,
                borderRadius: 8,
                marginBottom: 80,
              }}
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={{ maxHeight: 250, overflow: "hidden" }}
              >
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
              </ScrollView>
              <AppButton text="Enregistrer" onPress={handleClick} />
            </View>
          </View>
          {/* <QRCode value={`email: ${auth.email}\nvaleur: 1`} size={250} logoMargin={10}/> */}
        </LinearGradientBody>
      </KeyboardAvoidingView>
    </>
  );
};

export default NewProductForm;
