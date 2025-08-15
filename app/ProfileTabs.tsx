import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import {
    fetchCityObjectivesExample,
    fetchPlayerStats
} from "@/utils/Helper";
import { CityObjectives, PlayerStats } from "@/types/types";

function InfoScreen() {
    const [playerStats, setPlayerStats] = useState<PlayerStats | null>(null);
    const [cityObjectives, setCityObjectives] = useState<Map<number, CityObjectives> | null>(null);

    useEffect(() => {
        const data = fetchPlayerStats();
        setPlayerStats(data);

        const cityObjData = fetchCityObjectivesExample();
        setCityObjectives(cityObjData);
    }, []);

    if (!playerStats || !cityObjectives) return <Text>Loading...</Text>;

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>All points: {playerStats.totalPoints}</Text>

            <FlatList
                data={Array.from(cityObjectives.values())}
                keyExtractor={(c) => c.cityId.toString()}
                renderItem={({ item }) => {
                    const discovered = item.monumentsDiscovered || [];
                    const allMonuments = item.allMonuments || [];
                    console.log(item.allMonuments)
                    const locked = allMonuments.filter(m => !discovered.some(d => d.monumentId === m.monumentId));

                    return (
                        <View style={styles.cityCard}>
                            <Text style={styles.cityTitle}>{item.cityName}</Text>
                            <Text style={styles.text}>
                                Missions Completed: {item.missionsCompleted.length} / {allMonuments.length} monuments
                            </Text>

                            <Text style={styles.section}>Discovered Monuments</Text>
                            {discovered.map(m => (
                                <View key={m.monumentId} style={styles.monumentCard}>
                                    <Text style={styles.text}>{m.name}</Text>
                                </View>
                            ))}

                            <Text style={styles.section}>Locked Monuments</Text>
                            {locked.map(m => (
                                <View key={m.monumentId} style={styles.monumentCard}>
                                    <Text style={styles.text}>{m.name}</Text>
                                </View>
                            ))}
                        </View>
                    );
                }}
            />

            <Text style={styles.section}>Honors</Text>
            {playerStats.achievements.map(a => (
                <Text key={a.id}>🏅 {a.name} - {a.description}</Text>
            ))}
        </ScrollView>
    );
}

function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Settings</Text>
        </View>
    );
}

const TopTab = createMaterialTopTabNavigator();

export default function ProfileTabs() {
    return (
        <TopTab.Navigator lazy={true} screenOptions={{ swipeEnabled: true }}>
            <TopTab.Screen name="Info" component={InfoScreen} />
            <TopTab.Screen name="Settings" component={SettingsScreen} />
        </TopTab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
        borderRadius: 10,
        flex: 1
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#fff",
        marginBottom: 10
    },
    section: {
        marginTop: 15,
        fontWeight: "bold",
        color: "#fff"
    },
    text: {
        color: "#fff",
    },
    cityCard: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: "#33324b",
        borderRadius: 10
    },
    cityTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 5
    },
    monumentCard: {
        marginVertical: 5,
        padding: 8,
        backgroundColor: "#5d737e",
        borderRadius: 8
    }
});
