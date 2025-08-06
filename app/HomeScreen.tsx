import React, {useContext, useEffect} from "react";
import {Button, Pressable, StyleSheet, Text, View} from "react-native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "@/types/types";
import {SelectedItemContext} from "@/app/SelectedItemProvider";
import {useTargets} from "@/app/TargetsContext";
import {SelectedLevelContext} from "@/app/SelectedLevelContext";


type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
    const navigation = useNavigation<NavigationProp>();
    const {selectedItem} = useContext(SelectedItemContext);
    const {selectedLevel} = useContext(SelectedLevelContext);
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
                <Text>{selectedLevel?.difficulty}</Text>

                {targets.map(t => {
                    let styleSelectedItem = {}
                    let stylesTarget = {}
                    if (t.id === selectedItem?.id) {
                        styleSelectedItem = styles.selectedItem
                    }
                    /*if (!t.registered) {
                        stylesTarget = {...styles.target, backgroundColor: "#ff3232"}
                    }*/
                    if(t.strange === selectedLevel?.difficulty) {
                        stylesTarget = {...styles.target, backgroundColor: "#ff3232"}
                    }
                    return (
                        <Pressable key={t.id} onPress={() => navigation.navigate("target", {target: t})}
                                   style={stylesTarget}>
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
