"use client";

import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import Button from "@/components/button";
import { ScrollView } from "react-native-gesture-handler";

interface UserProfile {
  name: string;
  email: string;
  bio: string;
  location: string;
  avatar?: string;
}

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: "default" | "email-address";
}

const InputField = ({
  label,
  value,
  onChangeText,
  placeholder,
  multiline,
  numberOfLines,
  keyboardType = "default",
}: InputFieldProps) => (
  <View className="mb-4">
    <Text className="text-sm mb-1.5 text-gray-600 dark:text-gray-400 font-medium">
      {label}
    </Text>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      multiline={multiline}
      numberOfLines={numberOfLines}
      keyboardType={keyboardType}
      className="p-4 rounded-xl bg-gray-100 dark:bg-neutral-800 text-black dark:text-white text-base"
      placeholderTextColor="#666"
    />
  </View>
);

const EditProfile = ({ navigation }: any) => {
  const [profile, setProfile] = useState<UserProfile>({
    name: "John Smith",
    email: "john@example.com",
    bio: "Software developer passionate about creating beautiful and functional applications.",
    location: "San Francisco, CA",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-puWUl6qYQSeZD9WviDA3wzXr7QOKnh.png",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<UserProfile>>({});

  const handleChange = (field: keyof UserProfile, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<UserProfile> = {};

    if (!profile.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!profile.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(profile.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.back();
      Alert.alert("Success", "Profile updated successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]?.uri) {
      setProfile((prev) => ({
        ...prev,
        avatar: result.assets[0]?.uri,
      }));
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView className="bg-white dark:bg-black">
        <View className="flex-row items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <View className="w-10" />
          <Text className="text-xl font-semibold text-black dark:text-white">
            Edit Profile
          </Text>
          <Button onPress={() => router.back()} className="p-2">
            <Text>
              <Ionicons name="close-circle" size={28} color="#999" />
            </Text>
          </Button>
        </View>

        <ScrollView className="">
          <View className="p-4">
            <View className="items-center mb-6">
              <Button onPress={handlePickImage} className="relative">
                <Image
                  source={{ uri: profile.avatar }}
                  className="w-32 h-32 rounded-full"
                />
                <View className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full">
                  <Text>
                    <Ionicons name="camera" size={16} color="white" />
                  </Text>
                </View>
              </Button>
              <Text className="mt-2 text-sm text-blue-500">
                Change Profile Photo
              </Text>
            </View>

            <InputField
              label="Name"
              value={profile.name}
              onChangeText={(value) => handleChange("name", value)}
              placeholder="Enter your name"
            />
            {errors.name && (
              <Text className="text-red-500 text-sm mb-2">{errors.name}</Text>
            )}

            <InputField
              label="Email"
              value={profile.email}
              onChangeText={(value) => handleChange("email", value)}
              placeholder="Enter your email"
              keyboardType="email-address"
            />
            {errors.email && (
              <Text className="text-red-500 text-sm mb-2">{errors.email}</Text>
            )}

            <InputField
              label="Bio"
              value={profile.bio}
              onChangeText={(value) => handleChange("bio", value)}
              placeholder="Tell us about yourself"
              multiline
              numberOfLines={4}
            />

            <InputField
              label="Location"
              value={profile.location}
              onChangeText={(value) => handleChange("location", value)}
              placeholder="Enter your location"
            />

            <Button
              onPress={handleSubmit}
              disabled={isLoading}
              className={`mt-6 p-4 rounded-xl ${
                isLoading ? "bg-blue-400" : "bg-blue-500"
              }`}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white text-center font-semibold text-lg">
                  Save Changes
                </Text>
              )}
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default EditProfile;
