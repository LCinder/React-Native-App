import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import ItemGridList from "@/app/ItemGridList";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Monument, RootStackParamList } from "@/types/types";
import { useLocation } from "@/app/contexts/LocationContext";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "routes">;

export default function RouteScreen() {
    const navigation = useNavigation<NavigationProp>();
    const { route } = useRoute<RouteProp<RootStackParamList, "routes">>().params;

    const {
        monumentsByRouteMap,
        setRoute
    } = useLocation();

    const monumentsForRoute = monumentsByRouteMap?.[route.routeId] || [];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{route.title}</Text>
            <Text style={styles.text}>{route.description}</Text>

            <Button title="Select" onPress={() => setRoute(route)} />

            <ItemGridList
                data={monumentsForRoute}
                onPress={(monument: Monument) =>
                    navigation.navigate("monument", { monument })
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    title: { fontSize: 28, fontWeight: "700", marginBottom: 30, color: "#313131", textAlign: "center" },
    text: { textAlign: "center" },
    container: { flex: 1, paddingTop: 60 },
});
