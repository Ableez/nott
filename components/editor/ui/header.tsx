import Button from "@/components/button";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useRef } from "react";
import { Text, View } from "react-native";
import EditorThemeDrawer, { EditorThemeType } from "./editor-theme-drawer";
import { Drawer, DrawerContent } from "@/components/ui/drawer";

type Props = {
  handleToggleTheme: (theme: EditorThemeType) => void;
  currentTheme?: EditorThemeType;
};

const Header = ({ currentTheme, handleToggleTheme }: Props) => {
  const customBottomSheetRef = useRef<BottomSheetModal>(null);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: currentTheme?.borderColor,
      }}
      className="h-[7%]"
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <Button onPress={() => router.back()}>
          <Ionicons
            name="chevron-back"
            size={24}
            color={currentTheme?.textColor}
          />
        </Button>
        <View>
          <Text
            style={{
              color: currentTheme?.textColor,
              fontSize: 18,
              fontFamily: currentTheme?.fontFamily,
              fontWeight: "600",
            }}
          >
            My First Note
          </Text>
          <Text style={{ color: currentTheme?.accentColor, fontSize: 12 }}>
            Edited 2 hours ago
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", gap: 16 }}>
        <Button onPress={() => customBottomSheetRef.current?.present()}>
          <Ionicons
            name="color-palette"
            size={24}
            color={currentTheme?.textColor}
          />
        </Button>
        <Button>
          <Ionicons
            name="ellipsis-horizontal"
            size={24}
            color={currentTheme?.textColor}
          />
        </Button>
      </View>

      <Drawer snapPoints={["30%"]} customBottomSheetRef={customBottomSheetRef}>
        <DrawerContent
          style={{ backgroundColor: currentTheme?.backgroundColor }}
        >
          <EditorThemeDrawer handleToggleTheme={handleToggleTheme} />
        </DrawerContent>
      </Drawer>
    </View>
  );
};

export default Header;
