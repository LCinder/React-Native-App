import React from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./App";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "ProfileSettings">;

const options = [
  { id: "profile_settings", label: "Profile Settings"},
  { id: "language", label: "Language"},
  { id: "faqs", label: "FAQs"},
  { id: "notifications", label: "Notifications"},
  { id: "remove_account", label: "Remove Account"},
  { id: "close_session", label: "Close Session"}
];

export default function SettingsScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <ScrollView style={styles.container}>
      {options.map(opt => (
        <Pressable
          key={opt.id}
          onPress={() => navigation.navigate(opt.id as any)}
          style={styles.optionButton}
        >
          <Text style={styles.optionText}>{opt.label}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  optionButton: { padding: 15, borderBottomWidth: 1, borderBottomColor: "#ccc" },
  optionText: { fontSize: 18 }
});
