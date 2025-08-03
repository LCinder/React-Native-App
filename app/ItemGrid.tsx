import React from "react";
import { FlatList, View } from "react-native";
import Card from "./Card";

export default function ItemGrid({ data, onItemPress }) {
    return (
        <View style={{ paddingTop: 50 }}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.name}
                numColumns={2}
                renderItem={({ item }) => (
                    <Card item={item} onPress={() => onItemPress(item)} />
                )}
            />
        </View>
    );
}
