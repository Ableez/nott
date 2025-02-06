import { Tabs } from "expo-router";
import React from "react";
import { Platform, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { View } from "react-native";
import Button from "@/components/button";
import { colorScheme as mode } from "nativewind";

export default function TabLayout() {
  const colorScheme = mode.get();

  return (
    <Tabs
      detachInactiveScreens
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: true,
        headerLeft: (props) => (
          <Text className="mr-4 font-semibold">{props.label}</Text>
        ),
        headerTitleStyle: {
          fontSize: 28,
          color: colorScheme === "dark" ? "#fff" : "#222",
        },
        headerBackButtonDisplayMode: "minimal",
        headerStyle: {
          backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarButton: HapticTab,
        tabBarStyle: {
          height: 60,
          backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerRight: (props) => (
            <View className="flex-row items-center gap-6 mr-4">
              <Button>
                <Text className="dark:text-white text-black">
                  <Ionicons name="grid-outline" size={24} />
                </Text>
              </Button>
              <Button>
                <Text className="dark:text-white text-black">
                  <Ionicons name="settings-outline" size={24} />
                </Text>
              </Button>
            </View>
          ),
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
