import React from "react";
import { Text, useFont } from "@shopify/react-native-skia";
import { useDerivedValue, withTiming } from "react-native-reanimated";

const XAxisText = ({ x, y, text, selectedBar }) => {
  const font = useFont(require("../assets/fonts/Lato-Regular.ttf"), 14);

  const color = useDerivedValue(() => {
    if (selectedBar.value === text) {
      return withTiming("#1C2B39");
    } else if (selectedBar.value === null) {
      return withTiming("#1C2B39");
    } else {
      return withTiming("#d1d0c5");
    }
  });

  if (!font) {
    return null;
  }
  const fontSize = font?.getMetrics(text);
  return (
    <Text
      font={font}
      x={x - fontSize?.bounds?.width / 2}
      y={y - 5}
      text={text}
      color={color}
    />
  );
};

export default XAxisText;
