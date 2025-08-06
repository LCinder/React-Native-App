import React from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {colorPalette} from "@/utils/Helper";
import {MissionType} from "@/types/types";
import { Button } from "react-native";

type CardMissionTypeProps = {
    target: MissionType;
    onPress: (target: MissionType) => void;
};

export function CardMissionType({target, onPress}: Readonly<CardMissionTypeProps>) {
    return (
        <Pressable style={[styles.container]} onPress={() => onPress(target)}>
            <View style={styles.header}>
                <Text style={styles.title}>{target.name}</Text>
            </View>

            {/*<View style={styles.imageContainer}>
                <RemoteSVG uri={target.image_url} color={colorPalette[3]} />
            </View>*/}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1 / 2,
        margin: 25,
        borderRadius: 10,
        backgroundColor: colorPalette[1]
    },
    header: {
        alignItems: "center",
        margin: 15,
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#fff",
    },
    textContainer: {
        backgroundColor: "rgba(255,255,255,0.3)",
        padding: 10,
        alignItems: "center",
    },
    text: {
        color: "#fff",
    },
    imageContainer: {
        alignItems: "center",
    },
});
