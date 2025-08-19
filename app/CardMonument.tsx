import React from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {colorPalette, findColorByItem, ITEM_TEMPLATE} from "@/utils/Helper";
import {RemoteSVG} from "@/utils/RemoteSVG";
import {Monument} from "@/types/types";

type CardMonumentProps = {
    monument: Monument;
    onPress: (monument: Monument) => void;
};

export function CardMonument({monument: originalItem, onPress}: Readonly<CardMonumentProps>) {
    const itemToRender: Monument = originalItem
        //? originalItem
        //: {...ITEM_TEMPLATE, imageUrl: originalItem.imageUrl};

    const color = findColorByItem(itemToRender);

    return (
        <Pressable
            style={[styles.container, {backgroundColor: color}]}
            onPress={() => onPress(itemToRender)}
        >
            <View style={styles.header}>
                <Text style={styles.title}>{itemToRender.name}</Text>
            </View>

            <View style={styles.imageContainer}>
                <RemoteSVG
                    uri={itemToRender.imageUrl}
                    color={
                        itemToRender.registered ? colorPalette[3] : colorPalette[0]
                    }
                />
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.text}>{itemToRender.description}</Text>
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
        fontSize: 17,
    },
    imageContainer: {
        alignItems: "center",
    },
});
