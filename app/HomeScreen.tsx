import React, {useContext, useEffect, useState} from "react";
import {StyleSheet, View, Text} from "react-native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {useNavigation} from "@react-navigation/native";
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import {fetchData} from "@/utils/Helper";
import {Target, LabelValue, Level, MissionType } from "@/types/types";
import {SelectedItemContext} from "@/app/SelectedItemProvider";

export type RootStackParamList = {
    "map-all": undefined;
    "place-level": { place: LabelValue };
    "mission-type": { place: LabelValue; level: Level };
    "items": { place: LabelValue; level: Level; missionType: MissionType };
    "item": { item: Target };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
    const navigation = useNavigation<NavigationProp>();
    const [data, setData] = useState([]);
    const { selectedItemName } = useContext(SelectedItemContext);

    useEffect(() => {
        fetchData()
            .then(res => setData(res))
    }, []);

    return (
        <View style={styles.container}>
            {selectedItemName && (
                <Text style={{ marginTop: 30, fontSize: 18, fontWeight: "bold" }}>
                    Item Selected: {selectedItemName.name}
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
        paddingHorizontal: 20,
    },
});
