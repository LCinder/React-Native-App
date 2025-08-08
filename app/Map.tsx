import React, {useEffect, useRef, useState} from 'react';
import {Animated, Button, Easing, StyleSheet, Text, View} from 'react-native';
import * as LocationExpo from 'expo-location';
import MapboxGL from '@rnmapbox/maps';
import {getDistance} from 'geolib';
import {useNavigation, useRoute} from "@react-navigation/native";
import { MAPBOX_ACCESS_TOKEN } from '@env';

MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);

export default function Map() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [targetHit, setTargetHit] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();
    const mapRef = useRef(null);
    const [headingFrozen, setHeadingFrozen] = useState(false);

    const filteredHeading = useRef(0);
    const headingAnim = useRef(new Animated.Value(0)).current;

    const [heading, setHeading] = useState(0);

    const target = {latitude: 37.109673, longitude: -3.590427};

    const handleButtonPress = () => {
        if (!location?.coords) return;

        setHeadingFrozen(true);

        const {longitude, latitude} = location.coords;

        mapRef.current?.setCamera({
            centerCoordinate: [longitude, latitude],
            zoomLevel: 21,
            pitch: 70,
            heading: heading || 0,
            animationDuration: 1000,
            animationMode: "easeTo"
        });

        setTimeout(() => {
            mapRef.current?.setCamera({
                centerCoordinate: [longitude, latitude],
                zoomLevel: 19,
                pitch: 70,
                heading: heading || 0,
                animationDuration: 1000,
                animationMode: "easeTo"
            });

            setTimeout(() => {
                setHeadingFrozen(false);
            }, 1000);
        }, 1000);
    };

    useEffect(() => {
        (async () => {
            const {status} = await LocationExpo.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Location permission denied');
                return;
            }

            const loc = await LocationExpo.getCurrentPositionAsync({});
            setLocation(loc);

            await LocationExpo.watchPositionAsync(
                {accuracy: LocationExpo.Accuracy.Highest, distanceInterval: 1},
                (loc) => {
                    setLocation(loc);
                }
            );

            const headingSubscription = await LocationExpo.watchHeadingAsync(({
                                                                                  heading: h,
                                                                                  magneticHeading,
                                                                                  trueHeading
                                                                              }) => {
                const currentHeading = (typeof trueHeading === 'number' && trueHeading >= 0) ? trueHeading : magneticHeading;

                if (currentHeading !== null && currentHeading !== undefined) {
                    updateFilteredHeading(currentHeading);
                }
            });

            return () => {
                headingSubscription.remove();
            }
        })();
    }, []);

    const alpha = 0.1;
    const updateFilteredHeading = (newHeading) => {
        if (headingFrozen) return
        let prev = filteredHeading.current;

        let diff = newHeading - prev;
        if (diff > 180) newHeading -= 360;
        else if (diff < -180) newHeading += 360;

        let filtered = prev + alpha * (newHeading - prev);

        if (filtered < 0) filtered += 360;
        if (filtered >= 360) filtered -= 360;

        filteredHeading.current = filtered;

        if (Math.abs(newHeading - prev) > 5) {
            animateHeading(filtered);
            setHeading(filtered);
        }
    };

    const animateHeading = (toValue) => {
        Animated.timing(headingAnim, {
            toValue,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
        }).start();
    };


    const handleMapTouch = () => {
        setHeadingFrozen(true);
    };

    useEffect(() => {
        const detectedLabels = route.params?.labels;
        if (!detectedLabels || !location?.coords) return;

        const dist = getDistance(
            {latitude: location.coords.latitude, longitude: location.coords.longitude},
            target
        );

        if (dist < 20 && detectedLabels.length > 0 && !targetHit) {
            alert("You did it!");
            setTargetHit(true);
            // navigation.navigate("target", { target: 1 });
        }
    }, [route.params?.labels, location]);

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

        const {latitude, longitude} = location.coords;

        return (
            <View style={{flex: 1}}>
                <MapboxGL.MapView
                    style={{flex: 1}}
                    styleURL="mapbox://styles/lcinder/cme1jo4fq00gd01sb7cczcg9y"
                    pitchEnabled={true}
                    scrollEnabled={true}
                    zoomEnabled={true}
                    onTouchStart={handleMapTouch}
                    rotateEnabled={true}
                >
                    <MapboxGL.Camera
                        ref={mapRef}
                        zoomLevel={19}
                        centerCoordinate={[location?.coords.longitude || 0, location?.coords.latitude || 0]}
                        pitch={70}
                        heading={!headingFrozen ? heading : 0}
                        animationMode="easeTo"
                        animationDuration={500}
                        minZoomLevel={15}
                    />
                    <MapboxGL.UserLocation animated={true}/>
                    <MapboxGL.PointAnnotation
                        id="marker1"
                        coordinate={[-3.595152, 37.158607]}
                    >
                        <View style={styles.marker} />
                    </MapboxGL.PointAnnotation>
                </MapboxGL.MapView>


                <View style={styles.buttonContainer}>
                    <Button title="Return to current position" onPress={handleButtonPress} />
                    <Text style={styles.coords}>Lat: {latitude.toFixed(6)} | Lon: {longitude.toFixed(6)}</Text>
                    <Text style={styles.coords}>Heading: {heading.toFixed(2)}°</Text>
                </View>
            </View>
        );
    };

    return <View style={styles.container}>{renderMap()}</View>;
}

const styles = StyleSheet.create({
    container: {
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
    marker: {
        width: 30,
        height: 100,
        backgroundColor: '#6684ff',
        borderRadius: 15,
        borderColor: 'white',
        borderWidth: 2,
    },
});
