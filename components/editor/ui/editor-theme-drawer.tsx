import Button from "@/components/button";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

export type EditorThemeType = {
  id: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  accentColor: string;
  borderColor: string;
  isDark: boolean;
};

export const themes: EditorThemeType[] = [
  {
    id: "old_paper",
    backgroundColor: "#FDF5E6",
    textColor: "#2C1810",
    fontFamily: "SpaceMono",
    accentColor: "#8B4513",
    borderColor: "#DEB887",
    isDark: false,
  },
  {
    id: "modern_dark",
    backgroundColor: "#1A1A1A",
    textColor: "#FFFFFF",
    fontFamily: "SpaceMono",
    accentColor: "#00FF9D",
    borderColor: "#222222",
    isDark: true,
  },
  {
    id: "minimal_light",
    backgroundColor: "#FFFFFF",
    textColor: "#000000",
    fontFamily: "SpaceMono",
    accentColor: "#0066FF",
    borderColor: "#EEEEEE",
    isDark: false,
  },
];

type Props = {
  handleToggleTheme: (theme: EditorThemeType) => void;
};

const EditorThemeDrawer = ({ handleToggleTheme }: Props) => {
  return (
    <View style={{ padding: 16, width: "100%", gap: 4 }}>
      {themes.map((theme) => (
        <Button
          key={theme.id}
          style={{
            padding: 12,
            width: "100%",
            backgroundColor: theme.backgroundColor,
            borderRadius: 12,
            flexDirection: "row",
            gap: 16,
            alignItems: "center",
            borderWidth: 1,
            borderColor: theme.borderColor,
          }}
          onPress={() => handleToggleTheme(theme)}
        >
          <Ionicons name="color-palette" size={16} color={theme.accentColor} />
          <Text
            style={{
              color: theme.textColor,
              fontFamily: theme.fontFamily,
            }}
          >
            {theme.id
              .split("_")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </Text>
        </Button>
      ))}
    </View>
  );
};

export default EditorThemeDrawer;
