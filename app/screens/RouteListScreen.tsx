import React, { useEffect, useState } from "react";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import ItemGridList from "@/app/ItemGridList";
import { fetchRoutes } from "@/utils/Helper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Route, RootStackParamList } from "@/types/types";
import {StyleSheet, View, Text} from "react-native";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "mission-type">;

export default function RouteListScreen() {
    const [routes, setRoutes] = useState<Route[]>([]);
    const navigation = useNavigation<NavigationProp>();
    const { level } = 1//useRoute<RouteProp<RootStackParamList, "mission-type">>().params;

    useEffect(() => {
        setRoutes(fetchRoutes("1"));
    }, []);

    const handlePress = (route: Route) => {
        navigation.navigate("routes", { level, route });
    };

    return (
        <View>
            <Text style={styles.title}>Routes</Text>
            <ItemGridList data={routes} onPress={handlePress} />
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: "700",
        margin: 30,
        marginTop: 50,
        color: "#313131",
    },
})
