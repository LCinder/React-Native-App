import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import {
    fetchCitiesVisitedByUser,
    fetchUserStatsSummary
} from "@/utils/Helper";
import { City, UserStatsSummaryTable } from "@/types/types";

function InfoScreen() {
    const [userStatsSummary, setUserStatsSummary] = useState<UserStatsSummaryTable | null>(null);
    const [cityObjectives, setCityObjectives] = useState<City[] | null>(null);

    useEffect(() => {
        const data = fetchUserStatsSummary();
        setUserStatsSummary(data);

        const cityObjData = fetchCitiesVisitedByUser();
        setCityObjectives(cityObjData);
    }, []);

    if (!userStatsSummary || !cityObjectives) return <Text>Loading...</Text>;

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>All points: {userStatsSummary.totalPoints}</Text>

            userStatsSummary.recentMonuments.map((m) => (
                <View>
                <Text>{m.cityName}</Text>
                m.map(rm => (
                    <Text>{rm.name}</Text>
                ))
                </View>
            ))

            <Text style={styles.section}>Honors</Text>
            {userStatsSummary.achievements?.map(a => (
                <Text key={a.achievementId}>🏅 {a.name} - {a.description}</Text>
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
