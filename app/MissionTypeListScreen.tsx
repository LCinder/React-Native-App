import React, { useEffect, useState } from "react";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import ItemGridList from "./ItemGridList";
import { fetchMissionType } from "@/utils/Helper";
import { RootStackParamList } from "./HomeScreen";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {MissionType} from "@/types/types";
import {StyleSheet, View, Text} from "react-native";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "mission-type">;

export default function MissionTypeListScreen() {
    const [missionTypes, setMissionTypes] = useState<MissionType[]>([]);
    const navigation = useNavigation<NavigationProp>();
    const { level, place } = useRoute<RouteProp<RootStackParamList, "mission-type">>().params;

    useEffect(() => {
        setMissionTypes(fetchMissionType());
    }, []);

    const handlePress = (missionType: MissionType) => {
        navigation.navigate("items", { level, place, missionType });
    };

    return (
        <View>
            <Text style={styles.title}>Targets</Text>
            <ItemGridList data={missionTypes} onPress={handlePress} />
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
