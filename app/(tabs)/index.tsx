import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { colorScheme } from "nativewind";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/components/button";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { formatDistanceToNow, format } from "date-fns";
import { Note, notes } from "@/_mock_/notes";

const HomeScreen = () => {
  const dark = colorScheme.get() === "dark";
  const [searchText, setSearchText] = useState("");

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }: { item: Note }) => {
    const timeAgo = formatDistanceToNow(new Date(item.lastEditedTime), {
      addSuffix: true,
    });
    const formattedDate = format(new Date(item.lastEditedTime), "MM/dd/yyyy");

    return (
      <Button onPress={() => router.push("/editor/new")} className="px-4">
        <View className="border-2 border-b-4 border-neutral-200 dark:border-neutral-800 p-4 w-full flex flex-col mb-2 rounded-2xl dark:bg-neutral-900 bg-neutral-100">
          <View className="flex flex-row justify-between items-start">
            <Text className="dark:text-white text-lg font-semibold">
              {item.title}
            </Text>
            <View
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: item.theme }}
            />
          </View>
          <Text className="text-neutral-500 text-xs mb-2">
            {timeAgo} - {formattedDate}
          </Text>
          <Text className="dark:text-neutral-300 text-neutral-500">
            {item.summary}
          </Text>
        </View>
      </Button>
    );
  };

  return (
    <View
      className="dark:bg-black bg-white"
      style={{ height: Dimensions.get("screen").height }}
    >
      <StatusBar style="auto" />

      <FlatList
        scrollEnabled
        stickyHeaderHiddenOnScroll={true}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={() => (
          <View className="p-2 bg-white dark:bg-black px-4 w-full mb-4">
            <Button
              onPress={() => router.push("/search")}
              className="w-full py-2 rounded-2xl bg-neutral-100 dark:bg-neutral-900 flex-row justify-start items-center border dark:border-none dark:border-neutral-600 border-neutral-200/50 gap-3 pl-4"
            >
              <Ionicons
                size={20}
                color={dark ? "#555" : "#999"}
                name="search"
              />
              <Text className="font-medium text-neutral-600 dark:text-neutral-400 text-base">
                Search notes...
              </Text>
            </Button>
          </View>
        )}
        data={filteredNotes}
        renderItem={renderItem}
        keyExtractor={(item: Note) => item.title}
        contentContainerClassName="py-4"
      />

      <Button className="absolute bottom-4 right-4 rounded-full p-4 border-2 border-b-4 border-orange-500 bg-orange-400 shadow-md">
        <Ionicons name="add" size={28} color={"#fff"} />
      </Button>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    resizeMode: "repeat",
  },
});
