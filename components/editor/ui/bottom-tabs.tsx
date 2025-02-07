import Button from "@/components/button";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";

type Props = { currentThemeTextColor: string };

const EditorBottomTabs = ({ currentThemeTextColor }: Props) => {
  return (
    <View className="flex-row items-center justify-between h-[8%] border border-white">
      <Button className="bg-neutral-900 w-1/3 h-16 flex-row place-items-center justify-center items-center">
        <Ionicons name="image" size={24} color={currentThemeTextColor} />
      </Button>
      <Button className="bg-neutral-900 w-1/3 h-16 flex-row place-items-center justify-center items-center">
        <Ionicons name="mic" size={24} color={currentThemeTextColor} />
      </Button>
      <Button className="bg-neutral-900 w-1/3 h-16 flex-row place-items-center justify-center items-center">
        <Ionicons
          name="checkbox-outline"
          size={24}
          color={currentThemeTextColor}
        />
      </Button>
    </View>
  );
};

export default EditorBottomTabs;
