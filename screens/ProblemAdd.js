import React, { Component, useState } from "react";
import FormContainer from "../components/FormContainer";
import MultiLineInput from "../components/MultiLineInput";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { View } from "react-native";
import useSuiviStyles from "../styles/suiviStyles";
import VerifyText from "../components/VerifyText";

const ProblemAdd = () => {
  const suiviStyles = useSuiviStyles();
  const [problem, setProblem] = useState(null);
  const [obsvr, setObsvr] = useState("");
  const [solution, setSolution] = useState("");
  const [errors, setErrors] = useState({});
  const [nextStep, setNextStep] = useState(true);

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
          >
            <VerifyText
              items={[
                { label: "Problème", value: problem },
                { label: "Solution", value: solution },
                { label: "Observation", value: obsvr },
              ]}
            />
          </ProgressStep>
        </ProgressSteps>
      </View>
    </FormContainer>
  );
};

export default ProblemAdd;
