import React, { useEffect, useState } from "react";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import ItemGridList from "./ItemGridList";
import { fetchMissionType } from "@/Helper";
import { RootStackParamList } from "./HomeScreen";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "mission-type">;

export default function MissionTypeListScreen() {
    const [data, setData] = useState([]);
    const navigation = useNavigation<NavigationProp>();
    const { level, place } = useRoute<RouteProp<RootStackParamList, "mission-type">>().params;

    useEffect(() => {
        setData(fetchMissionType());
    }, []);

    const handlePress = (missionType) => {
        navigation.navigate("items", { level, place, missionType });
    };

    return <ItemGridList data={data} onPress={handlePress} />;
}
