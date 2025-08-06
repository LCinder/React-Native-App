import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as LocationExpo from 'expo-location';
import MapView, { Marker, UrlTile } from "react-native-maps";
import { getDistance } from 'geolib';
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Location() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [targetHit, setTargetHit] = useState(false);
    const [isInsideRadius, setIsInsideRadius] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();

    const target = { latitude: 37.109673, longitude: -3.590427 };

    useEffect(() => {
        (async () => {
            const { status } = await LocationExpo.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Location permission denied');
                return;
            }
            await updateLocation();
        })();
    }, []);

    useEffect(() => {
        const detectedLabels = route.params?.labels;
        if (!detectedLabels || !location?.coords) return;

        const dist = getDistance(location.coords, target);
        if (dist < 20 && detectedLabels.length > 0 && !targetHit) {
            alert("You did it!");
            setTargetHit(true);
            navigation.navigate("target", { target: 1 });
        }
    }, [route.params?.labels, location]);

    const updateLocation = async () => {
        try {
            const loc = await LocationExpo.getCurrentPositionAsync({});
            setLocation(loc);
            const withinRadius = getDistance(loc.coords, target) < 15;
            setIsInsideRadius(withinRadius);
        } catch (err) {
            console.error("Error getting location:", err);
            setErrorMsg("Failed to fetch location");
        }
    };

    const handleTakePhoto = () => {
        navigation.navigate("camerarecognition", {
            onReturn: (labels) => {
                if (!labels || labels.length === 0) {
                    alert("No labels detected.");
                    return;
                }

                const labelText = labels.map(
                    target => `${target.label} — ${(target.score * 100).toFixed(2)}%`
                ).join("\n");

                alert("Labels:\n" + labelText);
                // navigation.navigate("target", { target: 1 });
            }
        });
    };

    const renderMap = () => {
        if (!location?.coords) {
            return (
                <View style={styles.centered}>
                    <Text>{errorMsg || "Loading location..."}</Text>
                </View>
            );
        }

        const { latitude, longitude } = location.coords;
        const distanceToTarget = getDistance(location.coords, target);

        return (
            <>
                <MapView
                    style={styles.map}
                    showsUserLocation
                    followsUserLocation
                    initialRegion={{
                        latitude,
                        longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    <UrlTile
                        urlTemplate="https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=TI32OVxxl9rThTmshOHA"
                    />
                    <Marker coordinate={target} />
                </MapView>

                <View style={styles.buttonContainer}>
                    <Button title="Update Location" onPress={updateLocation} />
                    {isInsideRadius && <Button title="Take Photo" onPress={handleTakePhoto} />}
                    <Text style={styles.coords}>
                        Lat: {latitude?.toFixed(6)}{"\n"}
                        Lon: {longitude?.toFixed(6)}{"\n"}
                        Distance to Marker: {distanceToTarget} m
                    </Text>
                </View>
            </>
        );
    };


    return <View style={styles.container}>{renderMap()}</View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 40,
        left: 20,
        right: 20,
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    coords: {
        marginTop: 8,
        textAlign: 'center',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
