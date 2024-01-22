import React, { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import MultiLineInput from "../components/MultiLineInput";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { Alert, View } from "react-native";
import useSuiviStyles from "../styles/suiviStyles";
import VerifyText from "../components/VerifyText";
import useAxiosPrivate from "../hooks/usePrivateAxios";
import useScan from "../hooks/useScan";
import useSuivi from "../hooks/useSuivi";
import { StackActions } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import AppButton from "../components/Button";
import { axiosDefault } from "../api/axios";
import { useLoading } from "../hooks/useLoading";

const SuiviMultiStep = ({ navigation }) => {
  const suiviStyles = useSuiviStyles();
  const [problem, setProblem] = useState(null);
  const [obsvr, setObsvr] = useState("");
  const [solution, setSolution] = useState("");
  const [errors, setErrors] = useState({});
  const [nextStep, setNextStep] = useState(true);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(false);
  const { scanInfo } = useScan();
  const { setSuivis, images, setImages } = useSuivi();
  const { setLoading } = useLoading();
  const axiosPrivate = useAxiosPrivate();

  const validate = (value, message, error) => {
    let errorObject = {};
    if (!value) {
      errorObject[error] = message;
      setErrors(errorObject);
      setNextStep(true);
    } else {
      errorObject[error] = "";
      setErrors(errorObject);
      setNextStep(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      let productId = scanInfo.split(",")[1];
      const res = await axiosPrivate.post("/suivi/addSuivi", {
        productId,
        problem,
        observation: obsvr,
        solution,
      });

      if (res.data.success) {
        const formData = new FormData();
        formData.append("id", res.data.id);
        formData.append("productId", productId);
        if (images?.length) {
          for (let i = 0; i < images.length; i++) {
            formData.append(`images`, {
              uri: images[i].uri,
              type: "image/png",
              name: `image${i}.png`,
            });
          }
        } else {
          formData.append("image", {
            uri: images.uri,
            type: "image/png",
            name: "image.png",
          });
        }

        const result = await axiosDefault.put("/suivi/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setSuivis(result.data.suivis);
        setLoading(false);
        navigation.dispatch(StackActions.replace("tablesuivi"));
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleImagesPicker = () => {
    Alert.alert(
      "Pièces Jointes",
      "Veuillez choisir votre méthode de sélection",
      [
        {
          text: "Gallery",
          onPress: async () => {
            console.log("Gallery");
            if (hasGalleryPermission) {
              let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsMultipleSelection: true,
                quality: 1,
              });
              if (!result.canceled) {
                setImages(result.assets);
              }
            }
          },
        },
        {
          text: "Appareil Photos",
          onPress: () => {
            navigation.navigate("photo");
          },
        },
        {
          text: "Annuler",
        },
      ]
    );
  };

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus);
    })();
  }, []);

  return (
    <>
      <FormContainer screen="step">
        <View style={suiviStyles.progressStep}>
          <ProgressSteps>
            <ProgressStep
              label="Problème"
              nextBtnText="Suivant"
              nextBtnStyle={suiviStyles.nextprevButton}
              nextBtnTextStyle={suiviStyles.nexprevText}
              onNext={() => {
                return validate(
                  problem,
                  "Veuillez remplir le problème",
                  "problem"
                );
              }}
              errors={nextStep}
            >
              <MultiLineInput
                placeholder="Problème"
                value={problem}
                onChange={setProblem}
                error={errors.problem}
              />
            </ProgressStep>
            <ProgressStep
              label="Solution"
              nextBtnText="Suivant"
              previousBtnText="Retour"
              nextBtnStyle={suiviStyles.nextprevButton}
              nextBtnTextStyle={suiviStyles.nexprevText}
              previousBtnStyle={suiviStyles.nextprevButton}
              previousBtnTextStyle={suiviStyles.nexprevText}
              onNext={() => {
                return validate(
                  solution,
                  "Veuillez remplir la solution",
                  "solution"
                );
              }}
              errors={nextStep}
            >
              <MultiLineInput
                placeholder="Solution"
                value={solution}
                onChange={setSolution}
                error={errors.solution}
              />
            </ProgressStep>
            <ProgressStep
              label="Observation"
              nextBtnText="Suivant"
              previousBtnText="Retour"
              nextBtnStyle={suiviStyles.nextprevButton}
              nextBtnTextStyle={suiviStyles.nexprevText}
              previousBtnStyle={suiviStyles.nextprevButton}
              previousBtnTextStyle={suiviStyles.nexprevText}
            >
              <MultiLineInput
                placeholder="Observation"
                value={obsvr}
                onChange={setObsvr}
              />
              <AppButton
                text="pièces jointes"
                textStyle={{ fontSize: 13 }}
                viewStyle={{ padding: 6, borderRadius: 4 }}
                style={{
                  alignItems: "flex-end",
                  marginRight: 35,
                  marginTop: 5,
                }}
                onPress={handleImagesPicker}
              />
            </ProgressStep>
            <ProgressStep
              label="Vérification"
              finishBtnText="Envoyer"
              previousBtnText="Retour"
              nextBtnStyle={suiviStyles.nextprevButton}
              nextBtnTextStyle={suiviStyles.nexprevText}
              previousBtnStyle={suiviStyles.nextprevButton}
              previousBtnTextStyle={suiviStyles.nexprevText}
              onSubmit={() => handleSubmit()}
            >
              <VerifyText
                items={[
                  { label: "Problème", value: problem },
                  { label: "Solution", value: solution },
                  { label: "Observation", value: obsvr },
                ]}
                containerStyle={{ marginTop: 5 }}
                contentStyle={{ paddingTop: 15 }}
                labelStyle={{ fontSize: 16 }}
              />
            </ProgressStep>
          </ProgressSteps>
        </View>
      </FormContainer>
    </>
  );
};

export default SuiviMultiStep;
