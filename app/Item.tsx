import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {NavigationProp, useRoute} from "@react-navigation/core";
import {findColorByItem} from "../Helper";
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import {useNavigation} from "@react-navigation/native";

const {width} = Dimensions.get('window');

export default function Item() {
    const navigation = useNavigation();
    const route = useRoute();
    const {item} = route.params;

    return (
        <View style={[styles.container, {backgroundColor: findColorByItem(item)}]}>
            <View style={{alignItems: "center", justifyContent: "center"}}>
                <Text style={styles.textName}>{item.name}</Text>
            </View>
            <View style={styles.viewContainer}>
                <Text style={styles.text}>{item.type}</Text>
                <Text style={styles.text}>{item.strange}</Text>
            </View>

            <View style={styles.imageContainer}>
                <Image
                    source={{uri: item.image_url}}
                    style={[styles.image, {tintColor: !item.registered && "rgba(0, 0, 0, 0.9)"}]}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    imageContainer: {
        alignItems: "center",
        marginVertical: -30,
        zIndex: 2,
    },
    textName: {
        color: "#fff",
        fontSize: 30,
        marginTop: 50,
        marginLeft: 30,
        marginBottom: 20
    },
    text: {
        backgroundColor: "rgba(255,255,255,0.3)",
        borderRadius: 20,
        padding: 15,
        alignSelf: 'flex-start',
        color: "#fff",
        marginLeft: 30,
        marginBottom: 30
    },
    viewContainer: {
        flexDirection: "row"
    },
    semicircle: {
        width: width,
        height: 100,
        borderTopLeftRadius: width / 2,
        borderTopRightRadius: width / 2,
    },
    bottomHalf: {
        flex: 1,
        marginTop: -50,
        zIndex: 1,
    },
    image: {
        marginTop: 50,
        width: 300,
        height: 300,
    },
    closeButton: {
        paddingTop: 50,
        paddingLeft: 20,
    },
});
