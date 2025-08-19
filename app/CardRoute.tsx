import React from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {colorPalette} from "@/utils/Helper";
import {Route} from "@/types/types";

type CardRouteTypeProps = {
    route: Route;
    onPress: (route: Route) => void;
};

export function CardRoute({route, onPress}: Readonly<CardRouteProps>) {
    return (
        <Pressable style={[styles.container]} onPress={() => onPress(route)}>
            <View style={styles.header}>
                <Text style={styles.title}>{route.title}</Text>
                <Text style={styles.text}>{route.description}</Text>
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
        backgroundColor: colorPalette[0]
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
