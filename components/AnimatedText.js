import { View } from "react-native";
import React from "react";
import { useDerivedValue } from "react-native-reanimated";
import { Canvas, Text, useFont } from "@shopify/react-native-skia";

const AnimatedText = ({ selectedValue }) => {
  const font = useFont(require("../assets/fonts/Lato-Regular.ttf"), 40);

  const animatedText = useDerivedValue(() => {
    return `${Math.round(selectedValue.value)}`;
  });

  if (!font) {
    return <View />;
  }

  const fontSize = font.getMetrics("0");

  return (
    <Canvas style={{ height: fontSize?.bounds?.height + 40 }}>
      <Text
        text={animatedText}
        font={font}
        color={"#1C2B39"}
        y={fontSize?.bounds?.height + 10}
      />
    </Canvas>
  );
};

export default AnimatedText;
