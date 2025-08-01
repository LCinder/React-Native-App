import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
    allLevels,
    fetchTempData,
    findColorByLevel,
} from "@/Helper";

export default function PlaceLevel() {
    const route = useRoute();
    const navigation = useNavigation();
    const { place } = route.params;

    const [data, setData] = useState([]);
    const [registered, setRegistered] = useState([]);

    useEffect(() => {
        const tempData = fetchTempData();
        setData(tempData);

        const levelsWithCount = allLevels.map((level) => {
            const count = tempData.filter(
                (item) => item.registered === true
            ).length;
            return {
                ...level,
                count,
            };
        });

        setRegistered(levelsWithCount);
        console.log(levelsWithCount)
    }, []);

    const handleLevelPress = (level) => {
        navigation.navigate("table", { data, level, place });
    };

    const renderLevel = ({ item }) => {
        const progress = registered.find(r => r.difficulty === item.difficulty);
        console.log(item)
        const count = progress?.count || 0;
        const percentage = data.length > 0 ? ((count / data.length) * 100).toFixed(0) : 0;

        return (
            <TouchableOpacity
                style={[styles.levelCard, { backgroundColor: findColorByLevel(item) }]}
                onPress={() => handleLevelPress(item)}
            >
                <Text style={styles.levelText}>
                    {item.difficulty} - {item.color}
                </Text>
                <Text style={styles.progressText}>{percentage}% completed</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{place?.name}</Text>

            <FlatList
                data={allLevels}
                keyExtractor={(item) => item.difficulty}
                renderItem={renderLevel}
                contentContainerStyle={styles.levelsContainer}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#313131",
        paddingHorizontal: 20,
        paddingTop: 60,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        marginBottom: 30,
        color: "#ffffff",
        textAlign: "center",
    },
    levelsContainer: {
        gap: 50,
        paddingBottom: 50,
    },
    levelCard: {
        padding: 50,
        borderRadius: 16,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    levelText: {
        fontSize: 20,
        fontWeight: "600",
        color: "#fff",
        marginBottom: 8,
        textAlign: "center",
    },
    progressText: {
        fontSize: 14,
        color: "#fff",
        textAlign: "center",
        opacity: 0.85,
    },
});
