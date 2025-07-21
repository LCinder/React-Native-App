import React, {useRef} from "react";
import {Animated, Dimensions, StatusBar, StyleSheet, Text, View,} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import {findColorByItem} from "../Helper";

const {width} = Dimensions.get("window");
const HEADER_MAX_HEIGHT = 450;
const HEADER_MIN_HEIGHT = HEADER_MAX_HEIGHT / 2;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function Item() {
    const route = useRoute();
    const navigation = useNavigation();
    const {item} = route.params;

    const scrollY = useRef(new Animated.Value(0)).current;

    const headerHeight = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: "clamp",
    });

    const imageScale = scrollY.interpolate({
        inputRange: [-100, 0, 100],
        outputRange: [1.2, 1, 0.55],
        extrapolate: "clamp",
    });

    const imageTranslateX = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, width / 2 - 40],
        extrapolate: "clamp",
    });

    const imageTranslateY = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, width - 250],
        extrapolate: "clamp",
    });

    const textTranslateY = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, width / 2 + 75],
        extrapolate: "clamp",
    });

    const textTranslateX = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2],
        outputRange: [0, -width / 4],
        extrapolate: "clamp",
    });

    return (
        <View style={styles.fill}>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content"/>

            <Animated.View
                style={[
                    styles.header,
                    {
                        backgroundColor: findColorByItem(item),
                        height: headerHeight,
                    },
                ]}
            >
                <View style={styles.titleContainer}>
                    <Animated.View
                        style={{
                            transform: [{translateX: textTranslateX}, {translateY: textTranslateY}],
                            position: "absolute",
                            top: -70
                        }}
                    >
                        <Text style={styles.title}>{item.name}</Text>
                    </Animated.View>

                    <Animated.Image
                        source={{uri: item.image_url}}
                        style={[
                            styles.image,
                            {
                                transform: [{scale: imageScale},
                                    {translateX: imageTranslateX},
                                    {translateY: imageTranslateY},],
                                tintColor: !item.registered ? "rgba(0, 0, 0, 1)" : undefined,
                            },
                        ]}
                    />
                </View>
            </Animated.View>

            <Animated.ScrollView
                style={styles.fill}
                contentContainerStyle={styles.scrollContainer}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: scrollY}}}],
                    {useNativeDriver: false}
                )}
            >
                <View style={{height: HEADER_MAX_HEIGHT}}/>

                <View style={styles.content}>
                    <View style={styles.typeRow}>
                        <Text style={styles.badge}>{item.type}</Text>
                        <Text style={styles.badge}>{item.strange}</Text>
                    </View>

                    <Text style={styles.paragraph}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel
                        tincidunt nulla. Vivamus id nisl nec nulla feugiat sagittis...
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel
                        tincidunt nulla. Vivamus id nisl nec nulla feugiat sagittis...
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel
                        tincidunt nulla. Vivamus id nisl nec nulla feugiat sagittis...
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel
                        tincidunt nulla. Vivamus id nisl nec nulla feugiat sagittis...
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel
                        tincidunt nulla. Vivamus id nisl nec nulla feugiat sagittis...

                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel
                        tincidunt nulla. Vivamus id nisl nec nulla feugiat sagittis...
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel
                        tincidunt nulla. Vivamus id nisl nec nulla feugiat sagittis...
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel
                        tincidunt nulla. Vivamus id nisl nec nulla feugiat sagittis...
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel
                        tincidunt nulla. Vivamus id nisl nec nulla feugiat sagittis...
                    </Text>
                </View>
            </Animated.ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    fill: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollContainer: {
        paddingBottom: 40,
    },
    header: {
        position: "absolute",
        width: width,
        justifyContent: "flex-end",
        alignItems: "center",
        zIndex: 10,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    image: {
        width: 300,
        height: 300,
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 30,
        color: "white",
        fontWeight: "bold",
    },
    content: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    typeRow: {
        flexDirection: "row",
        gap: 10,
        margin: 15,
    },
    badge: {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 16,
        color: "#333",
    },
    paragraph: {
        fontSize: 16,
        lineHeight: 24,
        color: "#444",
    },
});
