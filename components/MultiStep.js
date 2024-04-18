import React, { useEffect, useState } from "react";
import FormContainer from "./FormContainer";
import MultiLineInput from "./MultiLineInput";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { Alert, View } from "react-native";
import useSuiviStyles from "../styles/suiviStyles";
import VerifyText from "./VerifyText";
import useAxiosPrivate from "../hooks/usePrivateAxios";
import useScan from "../hooks/useScan";
import useSuivi from "../hooks/useSuivi";
import { StackActions } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useLoading } from "../hooks/useLoading";
import Gallery from "./Gallery";
import useImages from "../hooks/useImages";
import DropDownLists from "./DropDownLists";
import problemIcon from "../assets/png/mise-en-garde.png";
import useProblem from "../hooks/useProblem";
import useFormData from "../hooks/useFormData";
import useButtonStyles from "../styles/buttonStyles";
import ReactButton from "./ReactButton";
import deleteIcon from "../assets/png/effacer.png";
import useChart from "../hooks/useChart";

const MultiStep = ({ navigation, screen, idProblem, updateRow }) => {
  const suiviStyles = useSuiviStyles();
  const [problemId, setProblemId] = useState(idProblem);
  const [problem, setProblem] = useState(
    updateRow?.problem
      ?.split(":")
      [updateRow?.problem?.split(":")?.length - 1].trim()
  );
  const [observation, setObservation] = useState(
    updateRow?.observation?.split(";")[0]
  );
  const [solution, setSolution] = useState(updateRow?.solution);
  const [errors, setErrors] = useState({});
  const [nextStep, setNextStep] = useState(true);
  const [gallery, setGallery] = useState(updateRow?.observation);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(false);
  const { scanInfo } = useScan();
  const { setSuivis, images, setImages, setUpdateRow } = useSuivi();
  const { setYears, setStatProducts, setStatProblems } = useChart();
  const { problems } = useProblem();
  const { setLoading } = useLoading();
  const axiosPrivate = useAxiosPrivate();
  const imgInFormData = useImages();
  const dataInForm = useFormData();
  const buttonStyles = useButtonStyles();

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
      let productId = scanInfo.split(",")[1],
        res;
      const body = {
        productId,
        problem,
        observation,
        solution,
        problemId,
      };
      const newForm = new FormData();
      dataInForm(body, newForm);
      if (images) imgInFormData(images, newForm);
      if (updateRow && updateRow?.id) {
        newForm.append("id", updateRow.id);
        newForm.append("gallery", gallery);
        res = await axiosPrivate.put("/suivi", newForm, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else
        res = await axiosPrivate.post("/suivi", newForm, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      if (res.data.success) {
        setSuivis(res.data.suivis);
        setLoading(false);
        setImages(null);
        setYears(res.data.years);
        setStatProblems(res.data.statProblems);
        setStatProducts(res.data.statProducts);
        navigation.dispatch(StackActions.replace("tablesuivi"));
        setUpdateRow(null);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("ERROR SUBMIT SUIVI", error);
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

  const handleDeleteImg = () => {
    if (images) {
      setImages(null);
    }
    if (gallery?.includes(";") && gallery?.split(";")[1]) {
      setGallery(";");
    }
  };

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus);
    })();
  }, []);

  return (
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
            {problems && (
              <DropDownLists
                value={problemId}
                setValue={setProblemId}
                icon={problemIcon}
                text="Sélectionnez le catégorie de problème"
                label="Problème"
                data={problems}
              />
            )}
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
              value={observation}
              onChange={setObservation}
            />
            <View
              style={{
                flexDirection: "row-reverse",
                justifyContent: "space-between",
              }}
            >
              <ReactButton
                onPress={() => handleImagesPicker()}
                text="pièces jointes"
                touchableStyle={[
                  buttonStyles.buttonContainer,
                  {
                    marginRight: 35,
                    marginTop: 5,
                  },
                ]}
                viewStyle={[
                  buttonStyles.buttonView,
                  { padding: 6, borderRadius: 4 },
                ]}
                textStyle={[buttonStyles.buttonText, { fontSize: 13 }]}
              />
              {(images || (gallery?.includes(";") && gallery?.split(";")[1])) ? (
                <ReactButton
                  onPress={() => handleDeleteImg()}
                  icon={deleteIcon}
                  iconStyle={{
                    width: 20,
                    height: 20,
                    resizeMode: "contain",
                  }}
                  touchableStyle={[
                    suiviStyles.buttonIcon,
                    { marginLeft: 35, marginTop: 5 },
                  ]}
                />
              ) : null}
            </View>
            <Gallery screen={screen} images={images} observation={gallery} />
          </ProgressStep>
          <ProgressStep
            label="Vérification"
            finishBtnText="Envoyer"
            previousBtnText="Retour"
            nextBtnStyle={suiviStyles.nextprevButton}
            nextBtnTextStyle={suiviStyles.nexprevText}
            previousBtnStyle={suiviStyles.nextprevButton}
            previousBtnTextStyle={suiviStyles.nexprevText}
            onSubmit={handleSubmit}
          >
            <VerifyText
              items={[
                { label: "Problème", value: problem },
                { label: "Solution", value: solution },
                { label: "Observation", value: observation },
              ]}
              containerStyle={{ marginTop: 5 }}
              contentStyle={{ paddingTop: 15 }}
              labelStyle={{ fontSize: 16 }}
            />
          </ProgressStep>
        </ProgressSteps>
      </View>
    </FormContainer>
  );
};

export default MultiStep;
