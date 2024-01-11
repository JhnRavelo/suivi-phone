import { StyleSheet } from "react-native";

const qrcodeStyles = StyleSheet.create({
  formContainer: {
    backgroundColor: "#fff",
    width: 350,
    height: 400,
    borderRadius: 8,
    marginBottom: 80,
  },
  formScrollView: { maxHeight: 250, overflow: "hidden" },
  input: { marginBottom: 5, fontSize: 14, width: "100%", paddingBottom: 2 },
  inputView: { marginRight: 20 },
  textError: { fontSize: 12 },
});

export default qrcodeStyles;
