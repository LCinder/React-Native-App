import React, {useContext, useEffect} from "react";
import {Button, Pressable, StyleSheet, Text, View} from "react-native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {useNavigation} from "@react-navigation/native";
import {RootStackParamList, Monument} from "@/types/types";
import {SelectedItemContext} from "@/app/contexts/SelectedItemContext";
import {useMonuments} from "@/app/contexts/MonumentsContext";
import {SelectedLevelContext} from "@/app/contexts/SelectedLevelContext";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
    const navigation = useNavigation<NavigationProp>();
    const {selectedItem} = useContext(SelectedItemContext);
    const {selectedLevel} = useContext(SelectedLevelContext);
    const {monuments, currentRoute} = useMonuments();

    const changeZone = () => {
        navigation.navigate("map-all-places")
    }

    if(!monuments) return (
        <View style={styles.changeZoneView}>
            <Button title={"Change Zone"} onPress={changeZone}/>
        </View>
    )

    return (
        monuments &&
        <View style={styles.container}>
            <View style={styles.changeZoneView}>
                <Button title={"Change Zone"} onPress={changeZone}/>
            </View>
            <View style={styles.container}>
                {monuments.map(t => {
                    let styleSelectedItem = {}
                    let stylesMonument = {}
                    if (t.monumentId === selectedItem?.monumentId) {
                        styleSelectedItem = styles.selectedItem
                    }
                    /*if (!t.registered) {
                        stylesMonument = {...styles.monument, backgroundColor: "#ff3232"}
                    }*/
                    /*if (t.difficulty === selectedLevel?.difficulty) {
                        stylesMonument = {...styles.monument, backgroundColor: "#ff3232"}
                    }*/
                    return (
                        <Pressable key={t.monumentId} onPress={() => navigation.navigate("monument", {monument: t as Monument})}
                                   style={stylesMonument}>
                            <Text style={styleSelectedItem} key={t.monumentId}>{t.name}</Text>
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
    monument: {
        margin: 20,
    }
});
