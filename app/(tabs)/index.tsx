import { View, Text, Dimensions, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/button";
import { Ionicons } from "@expo/vector-icons";
import { colorScheme } from "nativewind";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 70;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const Home = () => {
  const dark = colorScheme.get() === "dark";
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const headerHeight = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE],
      [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      Extrapolate.CLAMP
    );

    return {
      height: headerHeight,
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backgroundColor: dark ? "black" : "white",
    };
  });

  const titleAnimatedStyle = useAnimatedStyle(() => {
    const fontSize = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE],
      [44, 34],
      Extrapolate.CLAMP
    );

    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE],
      [30, 0],
      Extrapolate.CLAMP
    );

    return {
      fontSize,
      transform: [{ translateY }],
    };
  });

  return (
    <SafeAreaView
      className="dark:bg-black bg-white"
      style={{ height: Dimensions.get("screen").height }}
    >
      <Animated.View
        className="px-4 flex-row items-start justify-between"
        style={headerAnimatedStyle}
      >
        <Animated.Text
          className="text-[40px] dark:text-white"
          style={titleAnimatedStyle}
        >
          Today
        </Animated.Text>
        <Button>
          <Ionicons
            name="settings-outline"
            size={20}
            color={dark ? "#fff" : "#000"}
          />
        </Button>
      </Animated.View>

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
      >
        {/* Add your scrollable content here */}
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <View
              key={i}
              className="h-20 m-4 bg-gray-200 dark:bg-gray-800 rounded-lg"
            />
          ))}
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default Home;
