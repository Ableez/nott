"use client";

import { useState, useCallback, useRef } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";
import { colorScheme, useColorScheme } from "nativewind";
import debounce from "lodash/debounce";
import { type Note, notes as notesData } from "@/_mock_/notes";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import Button from "@/components/button";

const notes = notesData;

const SearchScreen = () => {
  const isDark = colorScheme.get() === "dark";
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<Note[]>(notes);
  const [isFocused, setIsFocused] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const performSearch = useCallback(
    debounce((query: string) => {
      if (!query.trim()) {
        setSearchResults(notes);
        return;
      }

      const results = notes.filter((note) => {
        const searchableContent = [note.title, note.summary, note.plainMarkdown]
          .join(" ")
          .toLowerCase();

        return searchableContent.includes(query.toLowerCase());
      });

      setSearchResults(results);
    }, 300),
    []
  );

  const handleSearchChange = (text: string) => {
    setSearchText(text);
    performSearch(text);
  };

  const handleFocus = () => {
    setIsFocused(true);
    Animated.spring(animatedValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.spring(animatedValue, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const renderSearchResult = ({ item }: { item: Note }) => {
    const timeAgo = formatDistanceToNow(new Date(item.lastEditedTime), {
      addSuffix: true,
    });

    return (
      <Button
        onPress={() => {
          router.push("/editor/new");
        }}
        className="py-4 px-4 border-b border-b-neutral-100 dark:border-b-neutral-800"
        style={styles.resultItem}
      >
        <View className="flex-row justify-between items-start">
          <View className="flex-1">
            <Text className="dark:text-white text-lg font-semibold mb-1">
              {item.title}
            </Text>
            <Text className="text-neutral-500 text-xs mb-1">{timeAgo}</Text>
            <Text
              numberOfLines={2}
              className="text-neutral-600 dark:text-neutral-400 text-sm"
            >
              {item.summary}
            </Text>
          </View>
          <View
            className="w-3 h-3 rounded-full ml-2 mt-2"
            style={{ backgroundColor: item.theme }}
          />
        </View>
      </Button>
    );
  };

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -50],
  });

  return (
    <SafeAreaView style={styles.container}>
      <BlurView
        intensity={100}
        tint={isDark ? "dark" : "light"}
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: isDark ? "#000" : "#fff" },
        ]}
      >
        <View className="flex-row justify-between items-start px-4 pb-3 border-b border-b-neutral-100 dark:border-neutral-800 pt-12 space-x-4">
          <Button
            className="w-10 h-10 rounded-xl items-center justify-center"
            onPress={() => router.back()}
          >
            <Ionicons
              name="arrow-back"
              size={20}
              color={isDark ? "#555" : "#666"}
            />
          </Button>
          <View className="flex-1 flex-row items-center px-3 h-10 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
            <Ionicons
              name="search"
              size={20}
              color={isDark ? "#555" : "#999"}
              className="mr-2"
            />
            <TextInput
              className="flex-1 text-base text-black dark:text-white"
              placeholder="Search in notes..."
              placeholderTextColor={isDark ? "#555" : "#999"}
              value={searchText}
              onChangeText={handleSearchChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              autoFocus
              cursorColor={isDark ? "#fff" : "#000"}
            />
            {searchText ? (
              <TouchableOpacity
                onPress={() => handleSearchChange("")}
                className="p-1"
              >
                <Ionicons
                  name="close-circle"
                  size={20}
                  color={isDark ? "#555" : "#999"}
                />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        <FlatList
          data={searchResults}
          renderItem={renderSearchResult}
          keyExtractor={(item) => item.title}
          contentContainerStyle={styles.listContainer}
          keyboardDismissMode="on-drag"
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, isDark && styles.darkText]}>
                {searchText ? "No results found" : "Start typing to search"}
              </Text>
            </View>
          )}
        />
      </BlurView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(142, 142, 147, 0.12)",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 36,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 17,
    color: "#000",
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  resultItem: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(142, 142, 147, 0.12)",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
  },
  emptyText: {
    fontSize: 17,
    color: "#8e8e93",
    textAlign: "center",
  },
  darkText: {
    color: "#fff",
  },
});

export default SearchScreen;
