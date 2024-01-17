import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import TableSuivi from "../screens/TableSuivi";
import SuiviMultiStep from "../screens/SuiviMultiStep";

const Stack = createNativeStackNavigator();

const NavigationStackSuivi = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="tablesuivi" component={TableSuivi} />
      <Stack.Screen name="addsuivi" component={SuiviMultiStep} />
    </Stack.Navigator>
  );
};

export default NavigationStackSuivi;
