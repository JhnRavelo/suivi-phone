import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import styles from "../styles/dropDownListStyles"
import useQRCodeGenerator from '../hooks/useQRCodeGenerator';

const DropDownTypeLists = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const {productTypes} = useQRCodeGenerator()

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
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
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
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
        placeholder={!isFocus ? 'Sélectionnez le type de menuiserie' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
        // renderLeftIcon={() => (
        //   <AntDesign
        //     style={styles.icon}
        //     color={isFocus ? 'blue' : '#A2A2A2'}
        //     name="Safety"
        //     size={20}
        //   />
        // )}
      />
    </View>
  );
};

export default DropDownTypeLists;