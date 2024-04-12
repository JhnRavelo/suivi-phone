import React from "react";
import useSuivi from "../hooks/useSuivi";
import MultiStep from "../components/MultiStep";
import useProblem from "../hooks/useProblem";

const FormSuivi = ({ navigation }) => {
  const { updateRow } = useSuivi();
  const { problems } = useProblem();
  const idProblem = problems.find(
    (problem) =>
      problem.label ==
      updateRow?.problem?.split(":")[0]
  )?.value;
  return (
    <MultiStep
      screen="update"
      navigation={navigation}
      idProblem={idProblem}
      updateRow={updateRow}
    />
  );
};

export default FormSuivi;