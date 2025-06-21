import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import * as LocationExpo from 'expo-location';

export default function Location() {
    const [location, setLocation] = useState({});
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        getLocation();
    }, []);

    const getLocation = async () => {
        let {status} = await LocationExpo.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            setErrorMsg("Location denied");
            return;
        }

        let loc = await LocationExpo.getCurrentPositionAsync({});
        setLocation(loc);
    };

    return (
        <View style={styles.container}>
            <Text>Location:</Text>
            {location.coords ? (
                <View>
                    <Text>
                        Lat: {location.coords.latitude}{"\n"}
                        Lon: {location.coords.longitude}
                    </Text>
                    <Button title="Update location" onPress={getLocation}/>
                </View>
            ) : (
                <Text>{errorMsg || "Loading location..."}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        gap: 20,
        paddingHorizontal: 20,
    },
});
