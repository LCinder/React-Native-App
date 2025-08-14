import React from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {colorPalette} from "@/utils/Helper";

type CardMissionTypeProps = {
    item: any;
    onPress: (item: any) => void;
};

export function CardDefault({item, onPress}: Readonly<CardMissionTypeProps>) {
    return (
        <Pressable style={[styles.container]} onPress={() => onPress(item)}>
            <View style={styles.header}>
                <Text style={styles.title}>{item.name}</Text>
            </View>

            {/*<View style={styles.imageContainer}>
                <RemoteSVG uri={monument.image_url} color={colorPalette[3]} />
            </View>*/}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
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
