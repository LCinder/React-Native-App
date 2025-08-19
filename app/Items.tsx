import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import ItemGridList from "@/app/ItemGridList";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList, Monument} from "@/types/types";
import {useMonuments} from "@/app/contexts/MonumentsContext";
import { fetchMonuments } from "@/utils/Helper";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "items">;

export default function Items() {
    const navigation = useNavigation<NavigationProp>();
    const {route, level} = useRoute<RouteProp<RootStackParamList, "items">>().params;
    const { monuments } = useMonuments();
    const [monumentsByRoute, setMonumentsByRoute] = useState<Monument[] | null>(null)

    useEffect(() => {
        setMonumentsByRoute(fetchMonuments(route.routeId))
    }, [route.title, monuments]); //level.difficulty,

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{route.title}</Text>
            <Text style={styles.text}>{route.description}</Text>
            <ItemGridList
                data={monumentsByRoute}
                onPress={(monument: Monument) => navigation.navigate("monument", {monument})}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    title: { fontSize: 28, fontWeight: "700", marginBottom: 30, color: "#313131", textAlign: "center" },
    text: { textAlign: "center" },
    container: {flex: 1, paddingTop: 60},
});
