import React, {useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';
import * as Location from 'expo-location';

export default function Ubication() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const getLocation = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            setErrorMsg("Ubication denied");
            return;
        }

        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
    };

    useEffect(() => {
        getLocation();
    }, []);

    return (
        <View style={{padding: 20}}>
            <Text>Ubications:</Text>
            {location ? (
                <Text>
                    Lat: {location.coords.latitude}{"\n"}
                    Lon: {location.coords.longitude}
                </Text>
            ) : (
                <Text>{errorMsg || "Loading ubications..."}</Text>
            )}
            <Button title="Update ubications" onPress={getLocation}/>
        </View>
    );
}
