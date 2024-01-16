import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import TableSuivi from "../screens/TableSuivi";
import ProblemAdd from "../screens/ProblemAdd";

const Stack = createNativeStackNavigator();

const NavigationStackSuivi = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="tablesuivi" component={TableSuivi} />
      <Stack.Screen name="addproblem" component={ProblemAdd} />
    </Stack.Navigator>
  );
};

export default NavigationStackSuivi;
