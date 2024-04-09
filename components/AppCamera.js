import React, { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import { Button, Image, SafeAreaView, TouchableOpacity, View } from "react-native";
import photoIcon from "../assets/png/appareil-photo-reflex-numerique.png";
import useSuivi from "../hooks/useSuivi";
import { useLoading } from "../hooks/useLoading";
import CircleLoading from "./CircleLoading";

const AppCamera = ({ navigation }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(true);
  const cameraRef = useRef();
  const { setImages, images } = useSuivi();
  const { setLoading, loading } = useLoading();
  const [hasTaken, setHasTaken] = useState(false);

  const handleTakePicture = async () => {
    if (hasCameraPermission) {
      let options = {
        quality: 0,
        base64: true,
        exif: false,
        skipProcessing: true,
      };
      setLoading(true);
      let newPhoto = await cameraRef.current.takePictureAsync(options);
      setLoading(false);
      setImages(newPhoto);
      setHasTaken(true);
    }
  };

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
    })();
  }, []);
  return (
    <SafeAreaView style={{flex: 1,}}>
      {hasTaken && (
        <>
          <Image
            style={{ alignSelf: "stretch", flex: 1, margin: 5 }}
            source={{ uri: "data:image/jpg;base64," + images.base64 }}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: 5,
            }}
          >
            <Button
              title="Enregistrer"
              onPress={() => {
                navigation.goBack();
              }}
            />
            <Button
              title="Annuler"
              onPress={() => {
                setImages(null);
                navigation.goBack();
              }}
            />
            <Button
              title="Prendre un autre"
              onPress={() => {
                setHasTaken(false);
              }}
            />
          </View>
        </>
      )}
      {!hasTaken && (
        <Camera
          autoFocus={false}
          style={{
            flex: 1,
            alignItems: "center"
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
      )}
      {loading && <CircleLoading />}
    </SafeAreaView>
  );
};

export default AppCamera;
