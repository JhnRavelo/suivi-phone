import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import NewProductForm from "../screens/NewProductForm";

const Stack = createNativeStackNavigator();

const NavigationStackQRCodeGenerator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name="newProduct" component={NewProductForm}  />
    </Stack.Navigator>
  );
};

export default NavigationStackQRCodeGenerator;
