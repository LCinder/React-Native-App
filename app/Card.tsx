import React, {useState} from "react";
import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import {findColorByItem, retrieveRealItemState} from "../Helper";
import {RootStackParamList} from "./HomeScreen";

export default function Card({item: itemParams, onPress}) {
    const color = findColorByItem(itemParams);
    const [item, setItem] = useState(itemParams);//useState<RootStackParamList["ContainerList"]>(retrieveRealItemState(itemParams));

    return (
        <Pressable
            style={[styles.container, {backgroundColor: color}]}
            onPress={() => onPress(item)}
        >
            <View style={{alignItems: "center", margin: 15}}>
                <Text style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    color: "#fff",
                }}>{item.name}</Text>
            </View>

            <View style={{alignItems: "center"}}>
                <Image
                    source={{uri: item.image_url}}
                    style={[styles.image, {tintColor: !item.registered && 'rgba(0, 0, 0, 0.9)'}]}
                />
            </View>

            <View style={styles.textContainer}>
                <Text style={{color: "#fff"}}>{item.type}</Text>
                <Text style={{color: "#fff"}}>{item.strange}</Text>
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
    textContainer: {
        backgroundColor: "rgba(255,255,255,0.3)",
        padding: 10,
        alignItems: "center",
    },
    image: {
        width: 100,
        height: 100
    }
});
