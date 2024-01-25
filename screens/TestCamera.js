import React, { Component, useState } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import {launchCamera} from "react-native-image-picker";

const TestCamera = () => {
  const [pickedImage, setPickedImage] = useState(null);

  const pickImageHandler = () => {
    launchCamera({maxHeight: 600, maxWidth: 800}, res=>{
        console.log(res.assets)
        setPickedImage({uri: res.assets})
    })
    //   { title: "Pick an Image", maxWidth: 800, maxHeight: 600 },
    //   (res) => {
    //     if (res.didCancel) {
    //       console.log("User cancelled!");
    //     } else if (res.error) {
    //       console.log("Error", res.error);
    //     } else {
    //       setPickedImage({ uri: res.uri });
    //     }
    //   }
    // );
  };
  const resetHandler = () => {
    setPickedImage(null)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Pick Image From Camera and Gallery</Text>
      <View style={styles.placeholder}>
        <Image source={pickedImage} style={styles.previewImage} />
      </View>
      <View style={styles.button}>
        <Button title="Pick Image" onPress={pickImageHandler} />

        <Button title="Reset" onPress={resetHandler} />
      </View>
    </View>
  );
};

export default TestCamera;

let styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  textStyle: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    color: "red",
    marginTop: 10,
  },
  placeholder: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "70%",
    height: 280,
    marginTop: 50,
  },
  button: {
    width: "80%",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
});
