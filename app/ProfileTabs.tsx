import React, {useEffect, useState} from "react";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {FlatList, StyleSheet, Text, View} from "react-native";
import {fetchPlayerStats, groupMonumentsByCity} from "@/utils/Helper";
import ItemGridList from "@/app/ItemGridList";
import {MonumentsByCity, PlayerStats} from "@/types/types";

function InfoScreen() {

    const [playerStats, setPlayerStats] = useState<PlayerStats>(undefined)
    const [grouped, setGrouped] = useState<MonumentsByCity>(undefined)

    useEffect(() => {
        const data = fetchPlayerStats()
        setPlayerStats(data)

        setGrouped(groupMonumentsByCity(data?.monuments?.list));
        console.log(groupMonumentsByCity(data?.monuments?.list))
    }, []);

    if (!playerStats) return <Text>Loading...</Text>;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>All points: {playerStats.totalPoints}</Text>

            <Text style={styles.section}>Monuments unlocked: {playerStats.monuments.count}</Text>

            <Text style={styles.section}>Misions completed: {playerStats.missions.total}</Text>

            <FlatList
                data={grouped}
                keyExtractor={(c) => c.city}
                renderItem={({ item }) => (
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.city}</Text>
                        <ItemGridList
                            data={item.monuments}
                            onPress={(m) => console.log("Monument:", m)}
                        />
                    </View>
                )}
            />

            <Text style={styles.section}>Honors</Text>
            {playerStats.achievements.map(a => (
                <Text key={a.id}>🏅 {a.title} - {a.description}</Text>
            ))}

            <Text style={styles.section}>Trivials: {playerStats.trivials.total} (Average: {playerStats.trivials.averageScore}%)</Text>
        </View>
    );
}

function SettingsScreen() {
    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text>Settings</Text>
        </View>
    );
}

const TopTab = createMaterialTopTabNavigator();

export default function ProfileTabs() {
    return (
        <TopTab.Navigator>
            <TopTab.Screen name="Info" component={InfoScreen}/>
            <TopTab.Screen name="Settings" component={SettingsScreen}/>
        </TopTab.Navigator>
    );
}


const styles = StyleSheet.create({
    container: {
        margin: 5,
        borderRadius: 10,
        flex: 1
    },
    header: {
        alignItems: "center",
        margin: 15,
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#fff",
    },
    textContainer: {
        backgroundColor: "rgba(255,255,255,0.3)",
        padding: 10,
        alignItems: "center",
    },
    text: {
        color: "#fff",
    },
    imageContainer: {
        alignItems: "center",
    },
    section: {marginTop: 20, fontWeight: "bold"},
});
