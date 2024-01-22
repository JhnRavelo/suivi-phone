import { View, StyleSheet } from "react-native";
import React, {useEffect} from "react";
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { Circle, G, Svg } from "react-native-svg";
import useAppLoaderStyles from "../styles/appLoaderStyles"

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircleLoading = () => {
  const CIRCUMFERENCE = 250;
  const R = CIRCUMFERENCE / (2 * Math.PI);
  const STROKE_WIDTH = 7;
  const HALF_CIRCLE = R + STROKE_WIDTH;
  const DIAMETRE = HALF_CIRCLE * 2;
  const progress = useSharedValue(0);
  const rotation = useSharedValue(0);
  const appLoaderStyles = useAppLoaderStyles();

  useEffect(() => {
    startAnimation();
  }, []);
  const startAnimation = () => {
    progress.value = withTiming(0.6, { duration: 1000 });

    progress.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: 800 }),
        withTiming(0.1, { duration: 2000 })
      ),
      -1,
      true
    );

    rotation.value = withRepeat(
      withTiming(360, { duration: 900, easing: Easing.linear }),
      -1,
      false
    );
  };

  const animatedCircleProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: CIRCUMFERENCE * (1 - progress.value),
    };
  }, [progress.value]);

  const animatedViewStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: rotation.value + "deg" }],
    };
  }, []);
  return (
    <View style={[StyleSheet.absoluteFill, appLoaderStyles.loadingContainer]}>
      <Animated.View style={animatedViewStyle}>
        <Svg
          width={DIAMETRE}
          height={DIAMETRE}
          viewBox={`0 0 ${DIAMETRE} ${DIAMETRE}`}
        >
          <G origin={`${HALF_CIRCLE}, ${HALF_CIRCLE}`} rotation={"-90"}>
            <AnimatedCircle
              animatedProps={animatedCircleProps}
              fill="transparent"
              stroke="#7497BA"
              cx={"50%"}
              cy={"50%"}
              r={R}
              strokeWidth={STROKE_WIDTH}
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
            />
          </G>
        </Svg>
      </Animated.View>
    </View>
  );
};

export default CircleLoading;
