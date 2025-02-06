import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Hello from "@/components/hello";
import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Button from "@/components/button";
import { Ionicons } from "@expo/vector-icons";
import { colorScheme } from "nativewind";

const IS_DOM = typeof Hello !== "undefined";

const EditorId = () => {
  const { editorId } = useLocalSearchParams();
  const dark = colorScheme.get() === "dark";

  if (!IS_DOM) {
    console.log("NOTDOM");
    return null;
  }

  return (
    <SafeAreaView className="dark:bg-black bg-white flex-1">
      <StatusBar style="auto" />

      <View className="flex-row items-center justify-between px-4 py-3 border-b dark:border-neutral-800 border-neutral-200">
        <View className="flex-row items-center gap-3">
          <Button onPress={() => router.back()}>
            <Ionicons
              name="chevron-back"
              size={24}
              color={dark ? "#fff" : "#000"}
            />
          </Button>
          <View>
            <Text className="dark:text-white text-black text-lg font-semibold">
              My First Note
            </Text>
            <Text className="text-neutral-500 text-xs">Edited 2 hours ago</Text>
          </View>
        </View>

        <View className="flex-row gap-4">
          <Button>
            <Ionicons
              name="share-outline"
              size={24}
              color={dark ? "#fff" : "#000"}
            />
          </Button>
          <Button>
            <Ionicons
              name="ellipsis-horizontal"
              size={24}
              color={dark ? "#fff" : "#000"}
            />
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditorId;
