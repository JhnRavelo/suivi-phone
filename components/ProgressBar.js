import { View, Pressable, Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";

const ProgressBar = ({ nbrPages, currentPage, setCurrentPage, setIsScroll }) => {
  const [width, setWitdh] = useState(0);
  const animatedValue = useRef(new Animated.Value(-1000)).current;
  const reactive = useRef(new Animated.Value(-1000)).current;

  const handlePressablePress = (event) => {
    const { locationX } = event.nativeEvent;
    let page = Math.floor(locationX / (width / nbrPages)) + 1;
    setCurrentPage(page);
    setIsScroll(false)
    reactive.setValue(-width + (width * page) / nbrPages);
  };

  useEffect(() => {
    reactive.setValue(-width + (width * currentPage) / nbrPages);
  }, [currentPage, nbrPages]);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 50,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Pressable onPress={(e) => handlePressablePress(e)}>
        <View
          onLayout={(e) => {
            const newWidth = e.nativeEvent.layout.width;
            setWitdh(newWidth);
          }}
          style={{
            height: 14,
            backgroundColor: "black",
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          <View
            style={{ width: width, height: 14, borderRadius: 8, zIndex: 10 }}
          />
          <Animated.View
            style={{
              height: 14,
              width: "100%",
              backgroundColor: "red",
              left: 0,
              top: 0,
              position: "absolute",
              borderRadius: 8,
              transform: [{ translateX: animatedValue }],
            }}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default ProgressBar;
