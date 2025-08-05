import React from "react";
import {View, Text, StyleSheet} from "react-native";

export default function Profile() {

    return (
        <View style={styles.container}>
            <Text style={{ marginTop: 30, fontSize: 18, fontWeight: "bold" }}>
                Profile
            </Text>
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
});
