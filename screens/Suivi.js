import React, { useEffect} from "react";
import useScreen from "../hooks/useScreen";
import { useRoute } from "@react-navigation/native";
import NavigationStackSuivi from "../navigation/NavigationStackSuivi";

const Suivi = ({ navigation }) => {
  const screenRoute = useRoute();
  const { setScreen } = useScreen();
  let screenName = screenRoute.name;
  useEffect(() => {
    setScreen(screenName);
  }, [navigation]);

  return <NavigationStackSuivi />;
};

export default Suivi;
