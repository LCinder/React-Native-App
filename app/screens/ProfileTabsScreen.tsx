import React, { useContext, useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import {
    fetchUserProfile,
    fetchUserStatsSummary
} from "@/utils/Helper";
import {useMonuments} from "@/app/contexts/MonumentsContext"
import { City, UserProfile, UserStatsSummaryTable } from "@/types/types";
import { SelectedItemContext } from "@/app/contexts/SelectedItemContext";
import SettingsScreen from "./SettingsScreen";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export default function ProfileTabs() {
    const [userStatsSummary, setUserStatsSummary] = useState<UserStatsSummaryTable | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const { monuments } = useMonuments()
    const { selectedItem } = useContext(SelectedItemContext);
    const navigation = useNavigation<NavigationProp>();

    useEffect(() => {
        const profile = fetchUserProfile("userId");
        setUserProfile(profile)

        const userStats = fetchUserStatsSummary("userId");
        setUserStatsSummary(userStats)
    }, []);

    if (!userStatsSummary) return <Text>Loading...</Text>;

    return (
        <ScrollView style={styles.container}>
            <Pressable onPress={() => navigation.navigate("settings")}>
                <View style={{margin: 50} }>
                    <Text style={styles.title}>{userProfile?.username}</Text>
                </View>
            </Pressable>
            <Text style={styles.title}>Total points: {userProfile?.xp}</Text>

            <Text>{userProfile?.level}</Text>

            {selectedItem &&
                <View>
                    <Text style={styles.title}>Current Monument Available</Text>
                    <Text style={styles.title}>{selectedItem?.name}</Text>
                    <Text>{selectedItem?.description}</Text>
                </View>
            }

            <Text style={styles.title}>Current Route</Text>
            {monuments?.map((m) => (
                <Text key={m.monumentId}>{m.name} - {m.description}</Text>
            ))}

            <Text style={styles.section}>Recent Monuments Visited</Text>
            {userStatsSummary.recentMonuments?.map((city) => (
                <View key={city.cityId} style={styles.cityCard}>
                    <Text style={styles.cityTitle}>{city.cityName}</Text>
                    {city.recentMonuments?.map((monument) => (
                        <View key={monument.monumentId} style={styles.monumentCard}>
                            <Text>{monument.name}</Text>
                        </View>
                    ))}
                </View>
            ))}

            <Text style={styles.section}>Achievements</Text>
            {userStatsSummary.recentAchievements?.map((a) => (
                <Text key={a.achievementId}>🏅 {a.title} - {a.description} - {a.achievedAt}</Text>
            ))}
        </ScrollView>
    );
}

/*const TopTab = createMaterialTopTabNavigator();

export default function ProfileTabs() {
    return (
        <TopTab.Navigator lazy={true} screenOptions={{ swipeEnabled: true }}>
            <TopTab.Screen name="Info" component={InfoScreen} />
            <TopTab.Screen name="Settings" component={SettingsScreen} />
        </TopTab.Navigator>
    );
}
*/
const styles = StyleSheet.create({
    container: {
        margin: 5,
        borderRadius: 10,
        flex: 1
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 10,
        justifyContent: "center",
        alignContent: "center"
    },
    section: {
        marginTop: 15,
        fontWeight: "bold",
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
