import React from "react";
import {useNavigation} from "@react-navigation/native";
import ItemGridList from "@/app/ItemGridList";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList, Route} from "@/types/types";
import {StyleSheet, Text, View} from "react-native";
import {useLocation} from "@/app/contexts/LocationContext";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "routes">;

export default function RouteListScreen() {
    const navigation = useNavigation<NavigationProp>();
    const { routes } = useLocation();

    const handlePress = (route: Route) => {
        navigation.navigate("routes", { route });
    };

    return (
        <View>
            <Text style={styles.title}>Routes</Text>
            <ItemGridList data={routes} onPress={handlePress}/>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: "700",
        margin: 30,
        marginTop: 50,
        color: "#313131",
    },
})
