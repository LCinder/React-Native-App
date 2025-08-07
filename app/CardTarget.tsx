import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colorPalette, findColorByItem, ITEM_TEMPLATE } from "@/utils/Helper";
import { RemoteSVG } from "@/app/RemoteSVG";
import { Target } from "@/types/types";

type CardTargetProps = {
    target: Target;
    onPress: (target: Target) => void;
};

export function CardTarget({ target: originalItem, onPress }: Readonly<CardTargetProps>) {
    const itemToRender: Target = originalItem.registered
        ? originalItem
        : { ...ITEM_TEMPLATE, image_url: originalItem.image_url };

    const color = findColorByItem(itemToRender);

    return (
        <Pressable
            style={[styles.container, { backgroundColor: color }]}
            onPress={() => onPress(itemToRender)}
        >
            <View style={styles.header}>
                <Text style={styles.title}>{itemToRender.name}</Text>
            </View>

            <View style={styles.imageContainer}>
                <RemoteSVG
                    uri={itemToRender.image_url}
                    color={
                        itemToRender.registered ? colorPalette[3] : colorPalette[0]
                    }
                />
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.text}>{itemToRender.type}</Text>
                <Text style={styles.text}>{itemToRender.difficulty}</Text>
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
