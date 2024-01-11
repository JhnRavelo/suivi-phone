import React from "react";
import { Text, View } from "react-native";

const VerifyText = ({ items }) => {
  return (
    <View style={{ display: "flex", flexDirection: "column" }}>
      {items.map((item, index) => (
        <View
          style={{ display: "flex", flexDirection: "row", gap: 20 , padding: 5, paddingLeft: 25}}
          key={index}
        >
          <Text style={{ flex: 0, width: 100 , color: "#E4570F", fontSize: 14, fontWeight: 'bold'}}>{item.label} :</Text>
          <Text style={{ flex: 1 , fontSize: 14,}}>{item.value}</Text>
        </View>
      ))}
    </View>
  );
};

export default VerifyText;
