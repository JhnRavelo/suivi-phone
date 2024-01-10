import React from "react";
import { Image, Text, View } from "react-native";

const TabHome = ({ source, text}) => {
  return (
    <View>
      <Image
        source={source}
        resizeMode="contain"
        style={{
          width: 25,
          height: 25,
          tintColor: focused ? "#E4570F" : "#6F7DA3",
        }}
      />
      <Text style={{ color: focused ? "#E4570F" : "#6F7DA3", fontSize: 12 }}>
        {text}
      </Text>
    </View>
  );
};

export default TabHome;
