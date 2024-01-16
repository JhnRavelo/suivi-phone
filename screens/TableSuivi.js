import { View } from "react-native";
import FormTitle from "../components/FormTitle";
import FormContainer from "../components/FormContainer";
import LinearGradientBody from "../components/LinearGradienBody";
import Header from "../components/Header";

const TableSuivi = () => {
  return (
    <LinearGradientBody>
      <Header />
      <FormTitle title="Suivi" />
    </LinearGradientBody>
  );
};

export default TableSuivi;
