import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { allLevels, findColorByLevel } from "@/Helper";
import { RootStackParamList } from "./HomeScreen";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "place-level">;

export default function PlaceDifficultyScreen() {
    const navigation = useNavigation<NavigationProp>();
    const { place } = useRoute<RouteProp<RootStackParamList, "place-level">>().params;

    const handlePress = (level) => {
        navigation.navigate("mission-type", { level, place });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{place.name}</Text>
            <FlatList
                data={allLevels}
                keyExtractor={(item) => item.difficulty}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.levelCard, { backgroundColor: findColorByLevel(item) }]}
                        onPress={() => handlePress(item)}
                    >
                        <Text style={styles.levelText}>{item.difficulty}</Text>
                        <Text style={styles.progressText}>0% completed</Text>
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.levelsContainer}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#313131", paddingHorizontal: 20, paddingTop: 60 },
    title: { fontSize: 28, fontWeight: "700", marginBottom: 30, color: "#ffffff", textAlign: "center" },
    levelsContainer: { gap: 50, paddingBottom: 50 },
    levelCard: {
        padding: 50,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    levelText: { fontSize: 25, fontWeight: "600", color: "#fff", marginBottom: 8, textAlign: "center" },
    progressText: { fontSize: 17, color: "#fff", textAlign: "center", opacity: 0.85 },
});
