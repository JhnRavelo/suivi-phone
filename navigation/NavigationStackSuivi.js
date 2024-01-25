import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import TableSuivi from "../screens/TableSuivi";
import AddSuivi from "../screens/AddSuivi";
import UpdateSuivi from "../screens/UpdateSuivi";

const Stack = createNativeStackNavigator();

const NavigationStackSuivi = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="tablesuivi" component={TableSuivi} />
      <Stack.Screen name="addsuivi" component={AddSuivi} />
      <Stack.Screen name="updatesuivi" component={UpdateSuivi} />
    </Stack.Navigator>
  );
};

export default NavigationStackSuivi;
