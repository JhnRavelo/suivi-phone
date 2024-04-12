import { StyleSheet } from "react-native";

const useBottomTabsStyles = () => {
  return StyleSheet.create({
    tabBar: {
      position: "absolute",
      bottom: 25,
      left: 20,
      right: 20,
      borderRadius: 15,
      height: 70,
      backgroundColor: "#ffffff",
      elevation: 3,
    },
  });
};

export default useBottomTabsStyles;
