import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import "../style/global.css";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { colorScheme } from "nativewind";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Appearance, useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const scheme = useColorScheme();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={scheme ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="editor/[editorId]"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="search"
              options={{
                headerShown: false,
                presentation: "containedModal",
              }}
            />
            <Stack.Screen
              name="settings"
              options={{
                headerShown: true,
                headerTitle: "Settings",
                presentation: "containedModal",
              }}
            />
            <Stack.Screen
              name="edit-profile"
              options={{
                headerShown: true,
                headerTitle: "Edit your profile",
                presentation: "formSheet",
              }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>

          <StatusBar style="auto" />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
