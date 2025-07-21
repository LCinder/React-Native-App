import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import * as LocationExpo from 'expo-location';
import MapView, {Marker} from "react-native-maps";
import {getDistance} from 'geolib';
import {useNavigation} from "@react-navigation/native";

export default function Location() {
    const [location, setLocation] = useState({});
    const [errorMsg, setErrorMsg] = useState("");
    const [targetHitted, setTargetHitted] = useState(false);
    const navigation = useNavigation();

    const target = { lat: 37.109673, lon: -4.590427 }

    useEffect(() => {
        loadLocationPermission();
        getCurrentLocationAndCheckDistance();
    }, []);

    const loadLocationPermission = async () => {
        console.log("loading location...")
        let {status} = await LocationExpo.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            setErrorMsg("Location denied");
            return;
        }
    }

    const getCurrentLocationAndCheckDistance = async () => {
        let loc = await LocationExpo.getCurrentPositionAsync({});
        setLocation(loc);

        if (!targetHitted && distance(loc.coords.latitude, loc.coords.longitude, target.lat, target.lon) < 20) {
            alert("You hit the target!")
            setTargetHitted(!targetHitted)

            navigation.navigate("item", {item: 1})
        }
    };

    const distance = (currentLat, currentLon, targetLat, targetLon) => getDistance(
        {latitude: currentLat, longitude: currentLon},
        {latitude: targetLat, longitude: targetLon}
    );

    return (
        <View style={styles.container}>
            {location?.coords ? (
                <>
                    <MapView
                        style={styles.map}
                        showsUserLocation={true}
                        showsMyLocationButton={true}
                        followsUserLocation={true}
                        initialRegion={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                    >

                        <Marker
                            coordinate={{latitude: target.lat, longitude: target.lon}}
                        />
                    </MapView>

                    <View style={styles.buttonContainer}>
                        <Button title="Update Location" onPress={getCurrentLocationAndCheckDistance}/>
                        <Text style={styles.coords}>
                            Lat: {location.coords.latitude}{"\n"}
                            Lon: {location.coords.longitude}{"\n"}
                            Distance to Marker: {distance(location.coords.latitude, location.coords.longitude, target.lat, target.lon)}
                        </Text>
                    </View>
                </>
            ) : (
                <View style={styles.centered}>
                    <Text>{errorMsg || "Loading location..."}</Text>
                </View>
            )}
        </View>
    );

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