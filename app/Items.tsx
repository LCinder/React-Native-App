import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import ItemGridList from "./ItemGridList";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList, Monument} from "@/types/types";
import {useMonuments} from "@/app/MonumentsContext";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "items">;

export default function Items() {
    const [data, setData] = useState<Monument[]>([]);
    const navigation = useNavigation<NavigationProp>();
    const {missionType, level} = useRoute<RouteProp<RootStackParamList, "items">>().params;
    const {monuments, monumentLevels} = useMonuments();

    useEffect(() => {
        console.log(monuments)
        const result =
            monuments
                //.filter((i) => i.missionType === missionType.name)
                //.filter((i) => i.difficulty === level.difficulty);
        setData(result);
    }, [missionType.name, level.difficulty, monuments]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{missionType.name}</Text>
            <ItemGridList
                data={data}
                onPress={(monument: Monument) => navigation.navigate("monument", {monument})}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    title: {fontSize: 28, fontWeight: "700", marginBottom: 30, color: "#313131", textAlign: "center"},
    container: {flex: 1, paddingTop: 60},
});
