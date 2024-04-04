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
  return (
    <View style={[galleryStyles.ImgContainer, imgContainerStyle]}>
      {screen == "update" &&
      observation?.includes(";") &&
      observation?.split(";")[1] != "" &&
      observation?.split(";")[1] &&
      !images &&
      !images?.length ? (
        observation
          ?.split(";")[1]
          .split(",")
          .map((img, index) => (
            <Image
              key={index}
              source={{ uri: img }}
              style={[galleryStyles.img, imgStyle]}
            />
          ))
      ) : images?.length ? (
        <>
          {images.map((img, index) => (
            <Image
              key={index}
              source={{
                uri: img.uri,
              }}
              style={galleryStyles.img}
            />
          ))}
        </>
      ) : !images?.length && images ? (
        <Image
          source={{
            uri: `data:image/jpg;base64,` + images.base64,
          }}
          style={galleryStyles.img}
        />
      ) : null}
    </View>
  );
};

export default Gallery;
