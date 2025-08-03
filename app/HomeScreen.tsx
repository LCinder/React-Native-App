import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {useNavigation} from "@react-navigation/native";
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import {fetchData} from "../Helper";

export type RootStackParamList = {
    "map-all": undefined;
    "place-level": { place: Place };
    "mission-type": { place: Place; level: Level };
    "items": { place: Place; level: Level; missionType: MissionType };
    "item": { item: Item };
};


type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
    const navigation = useNavigation<NavigationProp>();
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData()
            .then(res => setData(res))
    }, []);

    return (
        <View style={styles.container}>
            <FontAwesome6 name="location-dot" iconStyle="solid" size={50} color={"#638eec"}
                          onPress={() => navigation.navigate("location")}/>

            <FontAwesome6 name="camera" iconStyle="solid" size={50} color={"#638eec"}
                          onPress={() => navigation.navigate("camerarecognition")}/>

            <FontAwesome6 name="table-list" iconStyle="solid" size={50} color={"#638eec"}
                onPress={() => navigation.navigate("map-all-places")} />

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
