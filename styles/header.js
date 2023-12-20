import { StyleSheet } from "react-native";

const headerStyles = StyleSheet.create({
  logoutButton: {
    left: 250,
  },
  logoutButtonView: {
    elevation: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 110,
    height: 35,
    borderRadius: 3,
    backgroundColor: "#E4570F",
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    fontFamily: "Lato-Regular"
  },
  logo: {
    width: 105,
    height: 30,
    top: 30,
    left: 20
  }
});

export default headerStyles
