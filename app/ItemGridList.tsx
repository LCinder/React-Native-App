import React from "react";
import {FlatList, StyleSheet, View} from "react-native";
import Card from "@/app/Card";
import {MissionType, Target} from "@/types/types";

type ContainerListProps<T> = {
    data: T[];
    onPress: (item: T) => void
};

export default function ItemGridList<T extends Target | MissionType>({
    data,
    onPress,
}: Readonly<ContainerListProps<T>>) {

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
