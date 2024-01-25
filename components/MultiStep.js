import React, { useEffect, useState } from "react";
import FormContainer from "./FormContainer";
import MultiLineInput from "./MultiLineInput";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { Alert, Image, View } from "react-native";
import useSuiviStyles from "../styles/suiviStyles";
import VerifyText from "./VerifyText";
import useAxiosPrivate from "../hooks/usePrivateAxios";
import useScan from "../hooks/useScan";
import useSuivi from "../hooks/useSuivi";
import { StackActions } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import AppButton from "./Button";
import { axiosDefault } from "../api/axios";
import { useLoading } from "../hooks/useLoading";

const MultiStep = ({
  navigation,
  screen,
  probleme,
  observation,
  solutions,
  id,
}) => {
  const suiviStyles = useSuiviStyles();
  const [problem, setProblem] = useState(probleme);
  const [obsvr, setObsvr] = useState(observation?.split(";")[0]);
  const [solution, setSolution] = useState(solutions);
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
    setLoading(true);
    try {
      let productId = scanInfo.split(",")[1];
      const res = await axiosPrivate.post("/suivi/addSuivi", {
        productId,
        problem,
        observation: obsvr,
        solution,
      });

      if (res.data.success) {
        if (!images) {
          setLoading(false);
          setSuivis(res.data.suivis);
          navigation.dispatch(StackActions.replace("tablesuivi"));
        } else {
          const formData = new FormData();
          formData.append("id", res.data.id);
          formData.append("productId", productId);
          if (images?.length) {
            for (let i = 0; i < images.length; i++) {
              formData.append(`images`, {
                uri: images[i].uri,
                type: "image/jpeg",
                name: `image${i}.jpeg`,
              });
            }
          } else if (!images?.length && images) {
            formData.append("image", {
              uri: images.uri,
              type: "image/jpeg",
              name: "image.jpeg",
            });
          }

          const result = await axiosDefault.put("/suivi/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          setSuivis(result.data.suivis);
          setLoading(false);
          setImages(null);
          navigation.dispatch(StackActions.replace("tablesuivi"));
        }
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      let productId = scanInfo.split(",")[1];

      const res = await axiosPrivate.put("/suivi/updateSuivi", {
        productId,
        problem,
        observation: obsvr,
        solution,
        id: id,
      });

      if (!res.data.success) {
        setLoading(false);
      } else {
        if (!images) {
          setLoading(false);
          setSuivis(res.data.suivis);
          navigation.dispatch(StackActions.replace("tablesuivi"));
        } else {
          const formData = new FormData();
          formData.append("id", id);
          formData.append("productId", productId);
          if (images && images?.length) {
            for (let i = 0; i < images.length; i++) {
              formData.append(`images`, {
                uri: images[i].uri,
                type: "image/jpeg",
                name: `image${i}.jpeg`,
              });
            }
          } else if (!images?.length && images) {
            formData.append("image", {
              uri: images.uri,
              type: "image/jpeg",
              name: "image.jpeg",
            });
          }

          const result = await axiosDefault.put(
            "/suivi/updateUpload",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (!result.data.success) return setLoading(false);
          setSuivis(result.data.suivis);
          setLoading(false);
          setImages(null);
          navigation.dispatch(StackActions.replace("tablesuivi"));
        }
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
              <View
                style={{
                  width: "100%",
                  height: "auto",
                  marginTop: 10,
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 10,
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                {screen == "update" &&
                observation?.includes(";") &&
                observation?.split(";")[1] != "null" &&
                observation?.split(";")[1] &&
                !images &&
                !images?.length ? (
                  observation
                    ?.split(";")[1]
                    .split(",")
                    .map((img, index) => (
                      <Image
                        key={index}
                        source={{ uri: img }}
                        style={{
                          resizeMode: "cover",
                          width: 160,
                          height: 160,
                        }}
                      />
                    ))
                ) : images?.length ? (
                  <>
                    {images.map((img, index) => (
                      <Image
                        key={index}
                        source={{
                          uri: img.uri,
                        }}
                        style={{
                          resizeMode: "cover",
                          width: 160,
                          height: 160,
                        }}
                      />
                    ))}
                  </>
                ) : !images?.length && images ? (
                  <Image
                    source={{
                      uri: `data:image/jpg;base64,` + images.base64,
                    }}
                    style={{ resizeMode: "cover", width: 160, height: 160 }}
                  />
                ) : null}
              </View>
            </ProgressStep>
            <ProgressStep
              label="Vérification"
              finishBtnText="Envoyer"
              previousBtnText="Retour"
              nextBtnStyle={suiviStyles.nextprevButton}
              nextBtnTextStyle={suiviStyles.nexprevText}
              previousBtnStyle={suiviStyles.nextprevButton}
              previousBtnTextStyle={suiviStyles.nexprevText}
              onSubmit={screen == "add" ? handleSubmit : handleUpdate}
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

export default MultiStep;
