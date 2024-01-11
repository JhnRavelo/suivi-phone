import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import NewProductForm from "../screens/NewProductForm";
import VerifyProductForm from "../screens/VerifyProductForm";

const Stack = createNativeStackNavigator();

const NavigationStackQRCodeGenerator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name="newProduct" component={NewProductForm}  />
      <Stack.Screen name="verifyProduct" component={VerifyProductForm}  />
    </Stack.Navigator>
  );
};

export default NavigationStackQRCodeGenerator;
