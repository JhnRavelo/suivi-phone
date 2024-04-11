import React from "react";
import useSuivi from "../hooks/useSuivi";
import MultiStep from "../components/MultiStep";
import useProblem from "../hooks/useProblem";

const UpdateSuivi = ({ navigation }) => {
  const { updateRow } = useSuivi();
  const { problems } = useProblem();
  const idProblem = problems.find(
    (problem) =>
      problem.label ==
      updateRow?.problem?.split(":")[0]
  )?.value;
  return (
    <MultiStep
      probleme={updateRow.problem}
      solutions={updateRow.solution}
      obser={updateRow.observation}
      screen="update"
      navigation={navigation}
      id={updateRow.id}
      idProblem={idProblem}
    />
  );
};

export default UpdateSuivi;
