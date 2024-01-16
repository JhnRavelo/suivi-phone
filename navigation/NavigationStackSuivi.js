import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import TableSuivi from "../screens/TableSuivi";

const Stack = createNativeStackNavigator();

const NavigationStackSuivi = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="tablesuivi" component={TableSuivi} />
    </Stack.Navigator>
  );
};

export default NavigationStackSuivi;
