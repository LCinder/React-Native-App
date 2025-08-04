import React from "react";
import {FlatList, StyleSheet, View, Text} from "react-native";
import {useNavigation} from "@react-navigation/native";
import type {NativeStackNavigationProp} from "@react-navigation/native-stack";
import type {RootStackParamList} from "./HomeScreen";
import Card from "@/app/Card";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type ContainerListProps<T> = {
    data: T[];
    onPress: (item: T) => void;
};

export default function ItemGridList<T extends { name: string }>({
    data,
    onPress,
}: ContainerListProps<T>) {
    const navigation = useNavigation<NavigationProp>();

    return (
        <View style={styles.resultContainer}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.name}
                numColumns={2}
                renderItem={({ item }) => <Card item={item} onPress={() => onPress(item)} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    resultContainer: {
        marginTop: 50
    },
});
