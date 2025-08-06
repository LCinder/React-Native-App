import React, {useContext, useEffect} from "react";
import {Button, Pressable, StyleSheet, Text, View} from "react-native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {useNavigation} from "@react-navigation/native";
import {LabelValue, Level, MissionType, RootStackParamList, Target} from "@/types/types";
import {SelectedItemContext} from "@/app/SelectedItemProvider";
import {useTargets} from "@/app/TargetsContext";


type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
    const navigation = useNavigation<NavigationProp>();
    const {selectedItem} = useContext(SelectedItemContext);
    const {targets} = useTargets();

    useEffect(() => {
        console.log("Loading targets: " + targets.length)
    }, [targets]);

    const changeZone = () => {
        navigation.navigate("map-all-places")
    }

    return (
        <View style={styles.container}>
            <View style={styles.changeZoneView}>
                <Button title={"Change Zone"} onPress={changeZone}/>
            </View>
            <View style={styles.container}>
                {targets.map(t => {
                    let styleSelectedItem = {}
                    if (t.id === selectedItem?.id) {
                        styleSelectedItem = styles.selectedItem
                    }
                    return (
                        <Pressable key={t.id} onPress={() => navigation.navigate("item", {item: t})} style={styles.target}>
                            <Text style={styleSelectedItem} key={t.id}>{t.name}</Text>
                        </Pressable>
                    )
                })}
            </View>
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
    changeZoneView: {
        backgroundColor: "#ff3e3e",
    },
    selectedItem: {
        marginTop: 30,
        fontSize: 25,
        fontWeight: "bold"
    },
    target: {
        margin: 20,
    }
});
