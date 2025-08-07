import React, {useContext, useEffect, useState} from "react";
import {Button, FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {CommonActions, useNavigation} from "@react-navigation/native";
import {fetchAllLevels, findColorByLevel} from "@/utils/Helper";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {Level, RootStackParamList} from "@/types/types";
import {SelectedLevelContext} from "@/app/SelectedLevelContext";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "place-level">;

export default function PlaceDifficultyScreen() {
    const navigation = useNavigation<NavigationProp>();
    const [allLevels, setAllLevels] = useState<Level[]>([])
    const {setSelectedLevel } = useContext(SelectedLevelContext);


    useEffect(() => {
        const levels = fetchAllLevels()
        setAllLevels(levels)
    }, []);

    const handlePress = (level: Level) => {
        navigation.navigate("mission-type", {level});
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={allLevels}
                keyExtractor={(item: Level) => item.difficulty}
                renderItem={({item}) => (
                    <TouchableOpacity
                        style={[styles.levelCard, {backgroundColor: findColorByLevel(item)}]}
                        onPress={() => handlePress(item)}
                    >
                        <Text style={styles.levelText}>{item.difficulty}</Text>
                        <Text style={styles.progressText}>0% completed</Text>
                        <Button title={"Select"} onPress={() => {
                            setSelectedLevel(item)
                            navigation.dispatch(
                                CommonActions.reset({
                                    index: 0,
                                    routes: [
                                        {
                                            name: "Home",
                                        },
                                    ],
                                })
                            );
                        }}></Button>

                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.levelsContainer}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, paddingHorizontal: 20, paddingTop: 60},
    title: {fontSize: 28, fontWeight: "700", marginBottom: 30, color: "#313131", textAlign: "center"},
    levelsContainer: {gap: 50, paddingBottom: 50},
    levelCard: {
        padding: 50,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    levelText: {fontSize: 25, fontWeight: "600", color: "#fff", marginBottom: 8, textAlign: "center"},
    progressText: {fontSize: 17, color: "#fff", textAlign: "center", opacity: 0.85},
});
