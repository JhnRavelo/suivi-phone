import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Scan from "../screens/Scan";
import Fiche from "../screens/Fiche";
import QrCode from "../screens/QrCode";
import Suivi from "../screens/Suivi";
import scanIcon from "../assets/png/qrCode.png";
import ficheIcon from "../assets/png/table.png";
import suiviIcon from "../assets/png/commande-traitee.png";
import addIcon from "../assets/png/plus.png";
import TabIcon from "../components/TabIcon";
import useBottomStyle from "../styles/bottomTabsStyles"

const Tab = createBottomTabNavigator();

const NavigationBottomTabHome = () => {
  const bottomTabsStyle = useBottomStyle()
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
              <TabIcon
                focused={focused}
                icon={scanIcon}
                text={"scan"}
                viewTabStyle={{ marginRight: 20 }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="fiche"
          component={Fiche}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon
                icon={ficheIcon}
                text={"fiche"}
                viewTabStyle={{ marginRight: 10 }}
                focused={focused}
              />
            ),
          }}
        />
        <Tab.Screen
          name="qrcode"
          component={QrCode}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon
                text="qr code"
                focused={focused}
                viewTabStyle={{ marginLeft: 10 }}
                icon={addIcon}
              />
            ),
          }}
        />
        <Tab.Screen
          name="suivi"
          component={Suivi}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon
                icon={suiviIcon}
                focused={focused}
                viewTabStyle={{ marginLeft: 20 }}
                text="suivi"
                textTabStyle={{marginRight: 3,}}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default NavigationBottomTabHome;
