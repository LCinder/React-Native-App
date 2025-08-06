import React, { useEffect, useState } from "react";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import ItemGridList from "./ItemGridList";
import { fetchMissionType } from "@/utils/Helper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {MissionType, RootStackParamList} from "@/types/types";
import {StyleSheet, View, Text} from "react-native";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "mission-type">;

export default function MissionPathListScreen() {
    const [missionTypes, setMissionTypes] = useState<MissionType[]>([]);
    const navigation = useNavigation<NavigationProp>();
    const { level } = useRoute<RouteProp<RootStackParamList, "mission-type">>().params;

    useEffect(() => {
        setMissionTypes(fetchMissionType());
    }, []);

    const handlePress = (missionType: MissionType) => {
        navigation.navigate("items", { level, missionType });
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
