import React, { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import { Image, Pressable, TouchableOpacity } from "react-native";
import photoIcon from "../assets/png/appareil-photo-reflex-numerique.png";
import useSuivi from "../hooks/useSuivi";
import { useLoading } from "../hooks/useLoading";
import CircleLoading from "./CircleLoading";

const AppCamera = ({ navigation }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(true);
  const cameraRef = useRef();
  const { setImages } = useSuivi();
  const { setLoading, loading } = useLoading();

  const handleTakePicture = async () => {
    if (hasCameraPermission) {
      setLoading(true);
      let newPhoto = await cameraRef.current.takePictureAsync({
        quality: 1,
        base64: true,
        exif: false,
      });
      setImages(newPhoto);
      setLoading(false);
      navigation.navigate("addsuivi");
    }
  };

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
    })();
  }, []);
  return (
    <>
      <Camera
        style={{
          flex: 1,
          alignItems: "center",
          // justifyContent: "center",
          // zIndex: 10,
        }}
        ref={cameraRef}
      >
        <TouchableOpacity onPress={handleTakePicture} style={{ top: "80%" }}>
          <Image
            source={photoIcon}
            style={{ width: 70, height: 70, tintColor: "#E4570F" }}
          />
        </TouchableOpacity>
      </Camera>
      {loading && <CircleLoading />}
    </>
  );
};

export default AppCamera;
