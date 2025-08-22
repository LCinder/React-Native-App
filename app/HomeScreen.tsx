import React from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, Monument } from "@/types/types";
import { useLocation } from "@/app/contexts/LocationContext";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
    const navigation = useNavigation<NavigationProp>();
    const { currentRoute, monumentsByRouteMap } = useLocation();

    if (!currentRoute) return (
        <View style={styles.changeZoneView}>
            <Button title="Change Zone" onPress={() => navigation.navigate("map-all-places")} />
        </View>
    );

    const monumentsOfCurrentRoute: Monument[] = currentRoute
        ? monumentsByRouteMap[currentRoute.routeId] || []
        : [];

    return (
        <View style={styles.container}>
            <View style={styles.changeZoneView}>
                <Button title="Change Zones" onPress={() => navigation.navigate("map-all-places")} />
            </View>

            <Text style={styles.selectedItem}>Current Route: {currentRoute.title}</Text>
            <Text>{currentRoute.description}</Text>
            {monumentsOfCurrentRoute.map((monument) => (
                <Pressable
                    key={monument.monumentId}
                    onPress={() => navigation.navigate("monument", { monument })}
                    style={[
                        styles.monument,
                        //monument.monumentId === selectedItem?.monumentId && styles.selectedItem,
                    ]}
                >
                    <Text>{monument.name}</Text>
                </Pressable>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", gap: 20, paddingHorizontal: 20 },
    changeZoneView: { backgroundColor: "#ff3e3e", width: "100%" },
    selectedItem: { marginTop: 30, fontSize: 25, fontWeight: "bold" },
    monument: { margin: 10 },
});
