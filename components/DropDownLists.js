import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import styles from "../styles/dropDownListStyles";
import useStyles from "../styles/main";
import useQrcodeStyles from "../styles/qrcodeStyles";

const DropDownLists = ({ value, setValue, error, icon, text, data, label }) => {
  const [isFocus, setIsFocus] = useState(false);
  const inputStyles = useStyles()
  const qrcodeStyles = useQrcodeStyles()

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          {label}
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        itemTextStyle={styles.itemTextStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? text : "..."}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <View style={styles.leftIconView}>
            <Image
              source={icon}
              style={[
                styles.iconStyle,
                { tintColor: `${isFocus ? "blue" : "black"}` },
              ]}
            />
          </View>
        )}
      />
      {error && <Text style={[inputStyles.textError, qrcodeStyles.textError]} >{error}</Text>}
    </View>
  );
};

export default DropDownLists;
