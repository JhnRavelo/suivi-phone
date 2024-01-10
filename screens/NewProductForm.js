import React, { useState } from "react";
import LoginInput from "../components/LoginInput";
import DropDownTypeLists from "../components/DropDownTypeLists";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import LinearGradientBody from "../components/LinearGradienBodyt";
import Header from "../components/Header";
import useStyles from "../styles/main";

const dimensionRegex = /^\d+\*\d+$/


const NewProductForm = () => {
  const styles = useStyles();
  const [dimension, setDimension] = useState();
  const [devis, setDevis] = useState();
  const [location, setLocation] = useState()
  const [detail, setDetail] = useState()
  const [errors, setErrors] = useState();

  const validate = () => {
    let errors = {};
    if (!dimension) {
      errors.dimension = "Veuillez mettre l'hauteur et le largeur";
    }else if(dimensionRegex.test(dimension)){
      errors.dimension = "De la forme hauteur*largeur"
    }
    setErrors(errors);
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
              >
                <DropDownTypeLists />
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
            </View>
          </View>
          {/* <QRCode value={`email: ${auth.email}\nvaleur: 1`} size={250} logoMargin={10}/> */}
        </LinearGradientBody>
      </KeyboardAvoidingView>
    </>
  );
};

export default NewProductForm;
