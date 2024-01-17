import React, { Component, useState } from "react";
import FormContainer from "../components/FormContainer";
import MultiLineInput from "../components/MultiLineInput";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { View } from "react-native";
import useSuiviStyles from "../styles/suiviStyles";
import VerifyText from "../components/VerifyText";
import useAxiosPrivate from "../hooks/usePrivateAxios";
import useScan from "../hooks/useScan";
import useSuivi from "../hooks/useSuivi";
import { StackActions } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";

const SuiviMultiStep = ({ navigation }) => {
  const suiviStyles = useSuiviStyles();
  const [problem, setProblem] = useState(null);
  const [obsvr, setObsvr] = useState("");
  const [solution, setSolution] = useState("");
  const [errors, setErrors] = useState({});
  const [nextStep, setNextStep] = useState(true);
  const { scanInfo } = useScan();
  const { setSuivis } = useSuivi();
  const {auth} = useAuth()
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
    console.log(auth)
    try {
      let productId = scanInfo.split(",")[1];
      const res = await axiosPrivate.post("/suivi/addSuivi", {
        productId,
        problem,
        observation: obsvr,
        solution,
      });
      if (res.data.success) {
        setSuivis(res.data.suivis);
        navigation.dispatch(StackActions.replace("tablesuivi"));
      }
    } catch (error) {
      console.log(error);
    }
  };

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
  );
};

export default SuiviMultiStep;
