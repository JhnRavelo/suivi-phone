import React from "react";
import MultiStep from "../components/MultiStep";

const AddSuivi = ({ navigation }) => {

  return (
    <MultiStep
      probleme={null}
      solutions={null}
      observation={null}
      screen="add"
      navigation={navigation}
    />
  );
};

export default AddSuivi;
