import { View, TouchableOpacity } from "react-native";
import React from "react";

const CustomTabBarButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        top: -30,
        justifyContent: "center",
        alignItems: "center",
        elevation: 2,
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: "#E4570F",
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
};

export default CustomTabBarButton;
