import { View, Image } from "react-native";
import React from "react";
import useGalleryStyles from "../styles/galleryStyles";

const Gallery = ({
  observation,
  screen,
  images,
  imgStyle,
  imgContainerStyle,
}) => {
  const galleryStyles = useGalleryStyles();
  const imagesArray = Array.isArray(images) ? images : images ? [images] : [];

  return (
    <View style={[galleryStyles.ImgContainer, imgContainerStyle]}>
      {screen === "update" &&
      observation &&
      observation.includes(";") &&
      observation.split(";")[1] !== "" &&
      observation.split(";")[1] &&
      imagesArray.length === 0
        ? observation
            .split(";")[1]
            .split(",")
            .map((img, index) => (
              <Image
                key={index}
                source={{ uri: img }}
                style={[galleryStyles.img, imgStyle]}
              />
            ))
        : imagesArray.map((img, index) => (
            <Image
              key={index}
              source={{
                uri: img.base64
                  ? `data:image/jpg;base64,${img.base64}`
                  : img.uri,
              }}
              style={galleryStyles.img}
            />
          ))}
    </View>
  );
};

export default Gallery;
