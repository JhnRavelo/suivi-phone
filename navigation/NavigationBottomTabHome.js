import React from "react";
import { Image, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Scan from "../screens/Scan";
import Fiche from "../screens/Fiche";
import QrCode from "../screens/QrCode";
import Suivi from "../screens/Suivi";
import bottomTabsStyle from "../styles/bottomTabs";
import scanIcon from "../assets/png/qrCode.png";
import ficheIcon from "../assets/png/table.png";
import suiviIcon from "../assets/png/commande-traitee.png";
import addIcon from "../assets/png/plus.png";

const Tab = createBottomTabNavigator();

const NavigationBottomTabHome = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: bottomTabsStyle.tabBar,
          tabBarHideOnKeyboard: true,
        }}
        initialRouteName="scan"
      >
        <Tab.Screen
          name="scan"
          component={Scan}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", marginRight: 20 }}>
                <Image
                  source={scanIcon}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? "#E4570F" : "#6F7DA3",
                  }}
                />
                <Text
                  style={{
                    color: focused ? "#E4570F" : "#6F7DA3",
                    fontSize: 12,
                    fontFamily: "Lato-Regular",
                  }}
                >
                  SCAN
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="fiche"
          component={Fiche}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", marginRight: 10 }}>
                <Image
                  source={ficheIcon}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? "#E4570F" : "#6F7DA3",
                  }}
                />
                <Text
                  style={{
                    color: focused ? "#E4570F" : "#6F7DA3",
                    fontSize: 12,
                    fontFamily: "Lato-Regular",
                  }}
                >
                  FICHE
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="qrcode"
          component={QrCode}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", marginLeft: 10 }}>
                <Image
                  source={addIcon}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? "#E4570F" : "#6F7DA3",
                  }}
                />
                <Text
                  style={{
                    color: focused ? "#E4570F" : "#6F7DA3",
                    fontSize: 12,
                    fontFamily: "Lato-Regular",
                  }}
                >
                  QR Code
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="suivi"
          component={Suivi}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", marginLeft: 20 }}>
                <Image
                  source={suiviIcon}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? "#E4570F" : "#6F7DA3",
                  }}
                />
                <Text
                  style={{
                    color: focused ? "#E4570F" : "#6F7DA3",
                    fontSize: 12,
                    fontFamily: "Lato-Regular",
                    marginRight: 2,
                  }}
                >
                  SUIVI
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default NavigationBottomTabHome;
