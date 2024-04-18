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
import useBottomStyle from "../styles/bottomTabsStyles";
import Chart from "../screens/Chart";
import { Image } from "react-native";
import chartIcon from "../assets/png/charte-de-croissance.png";
import CustomTabBarButton from "../components/CustomTabBarButton";
import useChart from "../hooks/useChart";

const Tab = createBottomTabNavigator();

const NavigationBottomTabHome = () => {
  const bottomTabsStyle = useBottomStyle();
  const { statProducts, statProblems } = useChart();
  return (
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
            <TabIcon focused={focused} icon={scanIcon} text={"scan"} />
          ),
        }}
      />
      <Tab.Screen
        name="fiche"
        component={Fiche}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={ficheIcon} text={"fiche"} focused={focused} />
          ),
        }}
      />
      {statProducts.length > 0 && (
        <Tab.Screen
          name="chart"
          component={Chart}
          options={{
            tabBarIcon: () => (
              <Image
                source={chartIcon}
                resizeMode="contain"
                style={{ width: 30, height: 30, tintColor: "#fff" }}
              />
            ),
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />
      )}
      <Tab.Screen
        name="qrcode"
        component={QrCode}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon text="qr code" focused={focused} icon={addIcon} />
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
              text="suivi"
              textTabStyle={{ marginRight: 3 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default NavigationBottomTabHome;
