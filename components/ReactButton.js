import { Image, Text, TouchableOpacity, View } from "react-native";

const ReactButton = ({
  touchableStyle,
  viewStyle,
  iconStyle,
  textStyle,
  text,
  icon,
  onPress,
}) => {
  return (
    <TouchableOpacity style={touchableStyle} onPress={onPress}>
      <View style={viewStyle}>
        {icon && <Image source={icon} style={iconStyle} />}
        {text && <Text style={textStyle}>{text}</Text>}
      </View>
    </TouchableOpacity>
  );
};

export default ReactButton;
