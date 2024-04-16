import { View, Text, Image } from "react-native";
import React from "react";
import useTabIconStyles from "../styles/tabIconStyles";

const TabIcon = ({ icon, focused, text, textTabStyle }) => {
  const tabsIconStyles = useTabIconStyles();
  return (
    <View style={tabsIconStyles.viewStyle}>
      <Image
        source={icon}
        resizeMode="contain"
        style={[
          tabsIconStyles.iconStyle,
          {
            tintColor: focused ? "#E4570F" : "#6F7DA3",
          },
        ]}
      />
      <Text
        style={[
          tabsIconStyles.textStyle,
          {
            color: focused ? "#E4570F" : "#6F7DA3",
          },
          textTabStyle,
        ]}
      >
        {text}
      </Text>
    </View>
  );
};

export default TabIcon;
