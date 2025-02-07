import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";

interface TextSegment {
  text: string;
  isBold: boolean;
  isItalic: boolean;
}

const Editor = () => {
  const [segments, setSegments] = useState<TextSegment[]>([
    { text: "Start typing here...", isBold: false, isItalic: false },
  ]);
  const [selectedSegmentIndex, setSelectedSegmentIndex] = useState(0);
  const [currentFormat, setCurrentFormat] = useState({
    isBold: false,
    isItalic: false,
  });

  const updateSegment = (index: number, newText: string) => {
    setSegments((prev) =>
      prev.map((seg, i) => (i === index ? { ...seg, text: newText } : seg))
    );
  };

  const toggleFormat = (format: "bold" | "italic") => {
    const newFormat = {
      ...currentFormat,
      [format === "bold" ? "isBold" : "isItalic"]:
        !currentFormat[format === "bold" ? "isBold" : "isItalic"],
    };
    setCurrentFormat(newFormat);

    // Create new segment with current format
    const currentSegment = segments[selectedSegmentIndex];
    if (currentSegment?.text.length! > 0) {
      setSegments((prev) => [
        ...prev.slice(0, selectedSegmentIndex + 1),
        { text: "", ...newFormat },
      ]);
      setSelectedSegmentIndex(selectedSegmentIndex + 1);
    } else {
      setSegments((prev) =>
        prev.map((seg, i) =>
          i === selectedSegmentIndex ? { ...seg, ...newFormat } : seg
        )
      );
    }
  };

  return (
    <View className="p-8 bg-white w-full h-full border-2 border-red-500 rounded-lg shadow-lg">
      <View className="flex-row gap-2 mb-4">
        <TouchableOpacity
          onPress={() => toggleFormat("bold")}
          className={`px-3 py-2 rounded ${
            currentFormat.isBold ? "bg-blue-500" : "bg-gray-200"
          }`}
        >
          <Text
            className={`${
              currentFormat.isBold ? "text-white" : "text-gray-800"
            }`}
          >
            B
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleFormat("italic")}
          className={`px-3 py-2 rounded ${
            currentFormat.isItalic ? "bg-blue-500" : "bg-gray-200"
          }`}
        >
          <Text
            className={`${
              currentFormat.isItalic ? "text-white" : "text-gray-800"
            }`}
          >
            I
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row flex-wrap border border-black p-2">
        {segments.map((segment, index) => (
          <TextInput
            key={index}
            multiline
            value={segment.text}
            onChangeText={(text) => updateSegment(index, text)}
            onFocus={() => setSelectedSegmentIndex(index)}
            className="text-base"
            style={{
              fontWeight: segment.isBold ? "bold" : "normal",
              fontStyle: segment.isItalic ? "italic" : "normal",
            }}
          />
        ))}
      </View>

      <View className="mt-4 p-2 bg-gray-100 rounded">
        <Text className="text-sm text-gray-500">
          Characters: {segments.reduce((acc, seg) => acc + seg.text.length, 0)}
        </Text>
      </View>
    </View>
  );
};

export default Editor;
