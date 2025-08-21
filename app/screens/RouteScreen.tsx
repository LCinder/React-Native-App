import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, Button} from "react-native";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import ItemGridList from "@/app/ItemGridList";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList, Monument} from "@/types/types";
import {useMonuments} from "@/app/contexts/MonumentsContext";
import { fetchMonuments } from "@/utils/Helper";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "routes">;

export default function RouteScreen() {
    const navigation = useNavigation<NavigationProp>();
    const { route, level } = useRoute<RouteProp<RootStackParamList, "routes">>().params;
    const { monuments, currentCity, setRoute } = useMonuments();
    const [monumentsByRoute, setMonumentsByRoute] = useState<Monument[] | null>(null)

    useEffect(() => {
        setMonumentsByRoute(fetchMonuments(route.routeId))
    }, [route.title, monuments]); //level.difficulty,

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{route.title}</Text>
            <Text style={styles.text}>{route.description}</Text>
            <Button title={"Select"} onPress={() => setRoute(route)}/>
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
