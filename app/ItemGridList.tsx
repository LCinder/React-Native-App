import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Card from "@/app/Card";
import { CardItem } from "@/types/types";

type ContainerListProps = {
    data: any;
    onPress: (item: CardItem) => void;
};

export default function ItemGridList({ data, onPress }: Readonly<ContainerListProps>) {
    return (
        <View style={styles.resultContainer}>
            <FlatList
                data={data}
                keyExtractor={(item, index) => item.name}
                numColumns={1}
                renderItem={({ item }) => <Card item={item} onPress={onPress} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    resultContainer: {
    },
});
