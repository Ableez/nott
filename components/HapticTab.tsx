// @ts-nocheck
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { Pressable, Animated, TouchableOpacity } from "react-native";
import { useRef, useCallback } from "react";
import * as Haptics from "expo-haptics";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function HapticTab(props: BottomTabBarButtonProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const animatePress = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.sequence([
      Animated.spring(scale, {
        toValue: 0.9,
        speed: 50,
        bounciness: 8,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        speed: 50,
        bounciness: 4,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <AnimatedPressable
      {...props}
      style={[
        props.style,
        {
          transform: [{ scale }],
          height: "100%",
        },
      ]}
      onPress={(e: any) => {
        animatePress();
        props.onPress?.(e);
      }}
    />
  );
}
