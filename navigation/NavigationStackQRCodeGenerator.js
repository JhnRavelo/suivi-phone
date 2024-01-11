import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import NewProductForm from "../screens/NewProductForm";
import VerifyProductForm from "../screens/VerifyProductForm";
import PrintQRCode from "../screens/PrintQRCode";

const Stack = createNativeStackNavigator();

const NavigationStackQRCodeGenerator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name="newProduct" component={NewProductForm}  />
      <Stack.Screen name="verifyProduct" component={VerifyProductForm}  />
      <Stack.Screen name="printQRCode" component={PrintQRCode}  />
    </Stack.Navigator>
  );
};

export default NavigationStackQRCodeGenerator;
