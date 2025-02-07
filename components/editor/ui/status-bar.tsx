import { Ionicons } from "@expo/vector-icons";
import { BatteryState, useBatteryLevel } from "expo-battery";
import React from "react";
import { Text, View } from "react-native";

type Props = {
  currentThemeIsDark: boolean;
};

const CustomStatusBar = ({ currentThemeIsDark }: Props) => {
  const batteryLevel = useBatteryLevel();

  return (
    <View className="flex-row items-center justify-between px-4 fixed pt-2 h-[5%]">
      <Text
        style={{
          color: currentThemeIsDark ? "#fff" : "#000",
        }}
      >
        {new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </Text>
      <View className="flex-row items-center justify-end ">
        {BatteryState.CHARGING && (
          <Ionicons
            name="flash"
            size={8}
            color={currentThemeIsDark ? "#fff" : "#000"}
          />
        )}
        <Ionicons
          name={
            batteryLevel * 100 > 80
              ? "battery-full"
              : batteryLevel * 100 > 20
              ? "battery-half"
              : "battery-dead"
          }
          className="flipped rotate-180"
          size={22}
          color={
            batteryLevel * 100 < 15 && !BatteryState.CHARGING
              ? "#eb0000"
              : currentThemeIsDark
              ? "#fff"
              : "#000"
          }
        />
      </View>
    </View>
  );
};

export default CustomStatusBar;
