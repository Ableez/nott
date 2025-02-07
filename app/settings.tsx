import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  SectionList,
  Appearance,
} from "react-native";
import React, { useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/components/button";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { colorScheme } from "nativewind";
import { router } from "expo-router";

interface MenuItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  external?: boolean;
  onPress: () => void;
  chevron?: boolean;
}

const MenuItem = ({
  icon,
  title,
  external,
  onPress,
  chevron = true,
}: MenuItemProps) => (
  <Button
    className="flex-row items-center justify-between py-4 px-4"
    onPress={onPress}
  >
    <View className="flex-row items-center">
      <Ionicons name={icon} size={20} color="#999" className="mr-3" />
      <Text className="text-base text-black dark:text-white font-medium">
        {title}
      </Text>
    </View>
    {chevron && (
      <Ionicons
        name={external ? "arrow-forward" : "chevron-forward"}
        size={20}
        color="#666"
      />
    )}
  </Button>
);

interface SectionHeaderProps {
  title: string;
}

const SectionHeader = ({ title }: SectionHeaderProps) => (
  <Text className="text-sm text-gray-500 dark:text-gray-400 px-4 pt-6 pb-2">
    {title}
  </Text>
);

export const SettingsHeader = () => (
  <View className="flex-row justify-between items-center px-4 py-3">
    <Text className="text-2xl font-semibold text-black dark:text-white">
      Settings
    </Text>
    <TouchableOpacity onPress={() => {}}>
      <Ionicons name="close" size={24} className="text-black dark:text-white" />
    </TouchableOpacity>
  </View>
);

interface SettingsItem {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  external?: boolean;
  chevron?: boolean;
  onPress: () => void;
}

interface SettingsSection {
  title: string;
  data: SettingsItem[];
}

export default function SettingsScreen() {
  const drawerRef = useRef<BottomSheetModal>(null);

  const sections: SettingsSection[] = [
    {
      title: "Account",
      data: [
        {
          icon: "person-outline",
          title: "Edit account info",
          onPress: () => router.push("/edit-profile"),
        },
      ],
    },
    {
      title: "Preferences",
      data: [
        {
          icon: "notifications-outline",
          title: "Notifications",
          onPress: () => {},
        },
        // {
        //   icon: "color-palette",
        //   title: "Appearance",
        //   onPress: () => drawerRef.current?.present(),
        // },
      ],
    },
    {
      title: "Resources",
      data: [
        {
          icon: "headset",
          title: "Contact Support",
          external: true,
          onPress: () => {},
        },
        {
          icon: "star-outline",
          title: "Rate in App Store",
          external: true,
          onPress: () => {},
        },
        {
          icon: "logo-twitter",
          title: "Follow @nott_dev",
          external: true,
          onPress: () => {},
        },
      ],
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <SectionList
        ListHeaderComponent={() => (
          <>
            <Button
              onPress={() => router.push("/edit-profile")}
              className="flex-row items-center p-4"
            >
              <Image
                source={{
                  uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-puWUl6qYQSeZD9WviDA3wzXr7QOKnh.png",
                }}
                className="w-[44px] h-[44px] rounded-full"
              />
              <Text className="text-xl ml-3 font-semibold text-black dark:text-white">
                John Smith
              </Text>
            </Button>
          </>
        )}
        sections={sections}
        renderItem={({ item }) => <MenuItem {...item} />}
        renderSectionHeader={({ section: { title } }) =>
          title ? <SectionHeader title={title} /> : null
        }
        keyExtractor={(item, index) => item.title + index}
      />

      <Drawer snapPoints={["30%"]} customBottomSheetRef={drawerRef}>
        <DrawerContent>
          <View className="px-4 py-3">
            <Text className="text-lg font-semibold text-black dark:text-white">
              Appearance
            </Text>
          </View>
          <View className="px-4">
            <Button
              onPress={() => {
                Appearance.setColorScheme("dark");
              }}
              className="flex-row rounded-2xl mb-2 items-center justify-between p-4 dark:bg-neutral-800"
            >
              <View className="flex-row items-center">
                <Ionicons
                  name="moon-outline"
                  size={20}
                  color="#999"
                  className="mr-3"
                />
                <Text className="text-base text-black dark:text-white">
                  Dark mode
                </Text>
              </View>
              <Ionicons
                name="radio-button-on"
                size={20}
                color={colorScheme.get() === "dark" ? "#0a84ff" : "#999"}
              />
            </Button>
            <Button
              onPress={() => {
                Appearance.setColorScheme("light");
              }}
              className="flex-row rounded-2xl mb-2 items-center justify-between p-4 dark:bg-neutral-800"
            >
              <View className="flex-row items-center">
                <Ionicons
                  name="sunny-outline"
                  size={20}
                  color="#999"
                  className="mr-3"
                />
                <Text className="text-base text-black dark:text-white">
                  Light mode
                </Text>
              </View>
              <Ionicons
                name="radio-button-off"
                color={colorScheme.get() === "light" ? "#0a84ff" : "#999"}
                size={20}
              />
            </Button>
          </View>
        </DrawerContent>
      </Drawer>
    </SafeAreaView>
  );
}
