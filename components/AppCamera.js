import React, { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import { Image, Pressable } from "react-native";
import photoIcon from "../assets/png/appareil-photo-reflex-numerique.png";

const AppCamera = ({ setValue, setTakeCamera }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(true);
  const cameraRef = useRef();

  const handleTakePicture = async () => {
    if (hasCameraPermission) {
      let newPhoto = await cameraRef.current.takePictureAsync({
        quality: 1,
        base64: true,
        exif: false,
      });
      setValue(newPhoto);
      setTakeCamera(false);
    }
  };

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
    })();
  }, []);
  return (
    <Camera
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
      }}
      ref={cameraRef}
    >
      <Pressable onPress={handleTakePicture} style={{ bottom: 50 }}>
        <Image
          source={photoIcon}
          style={{ width: 70, height: 70, tintColor: "#E4570F" }}
        />
      </Pressable>
    </Camera>
  );
};

export default AppCamera;
