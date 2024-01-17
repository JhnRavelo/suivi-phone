import React from "react";
import { Text, View } from "react-native";
import useVerifyTextStyles from "../styles/verifyTextStyles";

const VerifyText = ({
  items,
  containerStyle,
  contentStyle,
  labelStyle,
  textStyle,
}) => {
  const verifyStyles = useVerifyTextStyles();
  return (
    <View style={[verifyStyles.verifyTextContainer, containerStyle]}>
      {items.map((item, index) => (
        <View style={[verifyStyles.verifyTextView, contentStyle]} key={index}>
          <Text style={[verifyStyles.verifyTextTitle, labelStyle]}>
            {`${item.label} :`}
          </Text>
          <Text style={[verifyStyles.verifyTextValue, textStyle]}>
            {item.value}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default VerifyText;
