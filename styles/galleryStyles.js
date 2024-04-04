import { StyleSheet } from "react-native";

const useGalleryStyles = () => {
  return StyleSheet.create({
    ImgContainer: {
      width: "100%",
      height: "auto",
      marginTop: 10,
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      justifyContent: "space-around",
      alignItems: "center",
    },
    img: {
      resizeMode: "cover",
      width: 160,
      height: 160,
    },
  });
};

export default useGalleryStyles
