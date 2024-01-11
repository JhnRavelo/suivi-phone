import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import styles from "../styles/dropDownListStyles";
import useQRCodeGenerator from "../hooks/useQRCodeForm";
import CharpentIcon from "../assets/png/charpenterie.png";
import useStyles from "../styles/main";
import qrcodeStyles from "../styles/qrcodeStyles";

const DropDownTypeLists = ({ value, setValue, error }) => {
  const [isFocus, setIsFocus] = useState(false);
  const { productTypes } = useQRCodeGenerator();
  const inputStyles = useStyles()

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Type de ménuiserie
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
        data={productTypes}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Sélectionnez le type de menuiserie" : "..."}
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
              source={CharpentIcon}
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

export default DropDownTypeLists;
