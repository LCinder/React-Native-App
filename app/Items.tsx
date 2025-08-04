import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import ItemGridList from "./ItemGridList";
import { fetchTempData } from "@/Helper";
import { RootStackParamList } from "./HomeScreen";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {Target} from "@/types/types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "items">;

export default function Items() {
    const [data, setData] = useState<Target[]>([]);
    const navigation = useNavigation<NavigationProp>();
    const { missionType, level } = useRoute<RouteProp<RootStackParamList, "items">>().params;

    useEffect(() => {
        const result = fetchTempData()
            .filter((i) => i.missionType === missionType.name)
            .filter((i) => i.strange === level.difficulty);
        setData(result);
    }, [missionType.name, level.difficulty]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{missionType.name}</Text>
            <ItemGridList
                data={data}
                onPress={(item: Target) => navigation.navigate("item", { item })}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    title: { fontSize: 28, fontWeight: "700", marginBottom: 30, color: "#313131", textAlign: "center" },
    container: { flex: 1, paddingTop: 60 },
});
