import React from "react";
import useSuivi from "../hooks/useSuivi";
import MultiStep from "../components/MultiStep";

const UpdateSuivi = ({ navigation }) => {
  const { updateRow } = useSuivi();
  return (
    <MultiStep
      probleme={updateRow.problem}
      solutions={updateRow.solution}
      observation={updateRow.observation}
      screen="update"
      navigation={navigation}
      id={updateRow.id}
    />
  );
};

export default UpdateSuivi;
