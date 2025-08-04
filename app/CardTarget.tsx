import React, {useEffect, useState} from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {colorPalette, findColorByItem, ITEM_TEMPLATE} from "../Helper";
import {RemoteSVG} from "@/app/RemoteSVG";
import {Target} from "@/types/types";

export function CardTarget({item: originalItem, onPress}: { item: Target; onPress: (item: Target) => void }) {
    const [item, setItem] = useState<Target>(() => {
        if (!originalItem.registered) {
            const clone = {...ITEM_TEMPLATE, image_url: originalItem.image_url};
            return clone;
        }
        return originalItem;
    });

    const color = findColorByItem(item);

    return (
        <Pressable style={[styles.container, {backgroundColor: color}]} onPress={() => onPress(item)}>
            <View style={styles.header}>
                <Text style={styles.title}>{item.name}</Text>
            </View>

            <View style={styles.imageContainer}>
                <RemoteSVG uri={item.image_url} color={item.registered ? colorPalette[3] : colorPalette[0]} />
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.text}>{item.type}</Text>
                <Text style={styles.text}>{item.strange}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1 / 2,
        margin: 5,
        borderRadius: 10,
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
