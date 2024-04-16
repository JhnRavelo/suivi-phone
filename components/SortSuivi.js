import { View, Text, Animated, TextInput } from "react-native";
import React, { useState } from "react";
import ReactButton from "./ReactButton";
import chevronIcon from "../assets/png/fleche-vers-le-bas.png";
import problemIcon from "../assets/png/attention.png";
import calendarIcon from "../assets/png/calendar.png";
import useSortSuiviStyles from "../styles/sortSuiviStyles";

const SortSuivi = ({
  firstDate,
  lastDate,
  setModalOpen,
  modalOpen,
  tri,
  setTri,
  setOpen,
  problem,
  setProblem,
}) => {
  const [animation] = useState(new Animated.Value(0));
  const styles = useSortSuiviStyles();

  const toggleRotation = () => {
    setModalOpen(!modalOpen);
    const toValue = modalOpen ? 0 : 1;

    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const rotateInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-90deg"],
  });

  return (
    <View style={styles.sortContainer}>
      <ReactButton
        icon={tri === "calendar" ? calendarIcon : problemIcon}
        iconStyle={{ width: 25, height: 25 }}
        onPress={() => (tri === "calendar" ? setOpen(true) : null)}
      />
      <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
        <ReactButton
          icon={chevronIcon}
          iconStyle={{ width: 15, height: 10 }}
          onPress={() => toggleRotation()}
        />
      </Animated.View>
      {modalOpen && (
        <ReactButton
          icon={tri === "calendar" ? problemIcon : calendarIcon}
          iconStyle={{ height: 25, width: 25 }}
          onPress={() => {
            tri === "calendar" ? setTri("problem") : setTri("calendar");
            toggleRotation();
          }}
        />
      )}
      {tri == "calendar" ? (
        <View style={styles.dateView}>
          <Text style={styles.dateText}>
            {firstDate} / {lastDate}
          </Text>
        </View>
      ) : (
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="Rechercher"
            value={problem}
            onChangeText={setProblem}
          />
        </View>
      )}
    </View>
  );
};

export default SortSuivi;
