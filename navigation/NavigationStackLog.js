import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Home from "../screens/Home";
import AppCamera from "../components/AppCamera";

const Stack = createNativeStackNavigator();

const NavigationStackLog = () => {
  return (
      <Stack.Navigator initialRouteName="login" screenOptions={{headerShown: false}}>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="photo" component={AppCamera} />
      </Stack.Navigator>
  );
};

export default NavigationStackLog;
