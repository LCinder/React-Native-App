import React, { useState, useEffect } from 'react';
import MapboxGL from '@rnmapbox/maps';
import { StyleSheet, View, PermissionsAndroid, Platform } from 'react-native';
import * as Location from 'expo-location';

export default function Map() {
    const florenceCoords = [11.2558, 43.7696]; // Longitud, Latitud

    const [userCoords, setUserCoords] = useState<number[] | null>(null);

    useEffect(() => {
        (async () => {
            // Pedir permisos en Android
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                );
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('Permiso de ubicación denegado');
                    return;
                }
            } else {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    console.log('Permiso de ubicación denegado');
                    return;
                }
            }

            const location = await Location.getCurrentPositionAsync({});
            setUserCoords([location.coords.longitude, location.coords.latitude]);
        })();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <MapboxGL.MapView
                style={StyleSheet.absoluteFill}
                styleURL="mapbox://styles/mapbox/streets-v11"
                pitchEnabled={false}
                rotateEnabled={false}
                scrollEnabled={true}
                zoomEnabled={true}
            >
                <MapboxGL.Camera
                    zoomLevel={16}
                    centerCoordinate={florenceCoords}
                    pitch={60}
                    heading={0}
                    animationMode="none"
                />

                {/* Marcador en Florencia */}
                <MapboxGL.PointAnnotation
                    id="florence-marker"
                    coordinate={florenceCoords}
                >
                    <View
                        style={{
                            height: 30,
                            width: 30,
                            backgroundColor: '#00f',
                            borderRadius: 15,
                            borderColor: '#fff',
                            borderWidth: 3,
                        }}
                    />
                </MapboxGL.PointAnnotation>

                {/* Marcador personalizado para ubicación actual */}
                {userCoords && (
                    <MapboxGL.PointAnnotation id="user-location" coordinate={userCoords}>
                        <View
                            style={{
                                height: 24,
                                width: 24,
                                borderRadius: 12,
                                backgroundColor: '#ff0000',
                                borderColor: '#fff',
                                borderWidth: 3,
                            }}
                        />
                    </MapboxGL.PointAnnotation>
                )}
            </MapboxGL.MapView>
        </View>
    );
}
