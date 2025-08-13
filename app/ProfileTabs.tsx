import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, Text } from "react-native";

function InfoScreen() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Información</Text>
        </View>
    );
}

function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Ajustes</Text>
        </View>
    );
}

const TopTab = createMaterialTopTabNavigator();

export default function ProfileTabs() {
    return (
        <TopTab.Navigator>
            <TopTab.Screen name="Info" component={InfoScreen} />
            <TopTab.Screen name="Settings" component={SettingsScreen} />
        </TopTab.Navigator>
    );
}
