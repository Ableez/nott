import { useLocalSearchParams } from "expo-router";
import Hello from "@/components/hello";
import { Dimensions, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import CustomStatusBar from "@/components/editor/ui/status-bar";
import Header from "@/components/editor/ui/header";
import {
  EditorThemeType,
  themes,
} from "@/components/editor/ui/editor-theme-drawer";
import EditorBottomTabs from "@/components/editor/ui/bottom-tabs";
import { colorScheme } from "nativewind";
import Editor from "@/components/editor";

const IS_DOM = typeof Hello !== "undefined";

const EditorId = () => {
  const { editorId } = useLocalSearchParams();
  const [editorState, setEditorState] = useState<string | null>(null);
  const [plainText, setPlainText] = useState<string>("");

  const [currentTheme, setCurrentTheme] = useState(themes[1]);
  const dark = colorScheme.get() === "dark";

  if (!IS_DOM) {
    console.log("NOTDOM");
    return null;
  }

  const handleToggleTheme = (theme: EditorThemeType) => {
    setCurrentTheme(theme);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: currentTheme?.backgroundColor,
        height: Dimensions.get("screen").height,
      }}
    >
      <CustomStatusBar currentThemeIsDark={currentTheme?.isDark ?? false} />
      <StatusBar hidden />

      <Header
        handleToggleTheme={handleToggleTheme}
        currentTheme={currentTheme}
      />

      {/* main editor */}
      <View className="flex-row items-center justify-between h-[80%]">
        <Editor />
      </View>

      <EditorBottomTabs
        currentThemeTextColor={
          currentTheme?.textColor ?? dark ? "#fff" : "#000"
        }
      />
    </View>
  );
};

export default EditorId;
