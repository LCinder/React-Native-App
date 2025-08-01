import React from "react";
import {FlatList, StyleSheet, View} from "react-native";

import Card from "./Card";
import {RouteProp, useRoute} from "@react-navigation/core";
import {useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "./HomeScreen";

export default function ContainerList() {
    const route = useRoute<RouteProp<RootStackParamList["ContainerList"], "ContainerList">>();
    const navigation = useNavigation();
    const {data} = route.params;
    const {level} = route.params;
    const {place} = route.params;

    const dataToShow = data.filter(i => i.strange === level.difficulty).filter(i => place.name === i.place)

    const handlePress = (item) => {
        navigation.navigate("item", {item: item})
    };

    return (
        <View style={styles.resultContainer}>
            <FlatList
                data={dataToShow}
                keyExtractor={(item) => item.id}
                numColumns={2}
                renderItem={({item}) => <Card item={item} onPress={handlePress}/>}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    resultContainer: {
        paddingTop: 50,
    },
});
