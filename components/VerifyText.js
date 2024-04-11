import React from "react";
import { ScrollView, Text, View } from "react-native";
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
    <ScrollView style={[verifyStyles.verifyTextContainer, containerStyle]}>
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
    </ScrollView>
  );
};

export default VerifyText;
