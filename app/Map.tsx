import React, {useEffect, useRef, useState} from 'react';
import {Animated, Button, Easing, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as LocationExpo from 'expo-location';
import MapboxGL from '@rnmapbox/maps';
import {getDistance} from 'geolib';
import {useRoute} from "@react-navigation/native";
import {MAPBOX_ACCESS_TOKEN} from '@env';
import Icon from 'react-native-vector-icons/Ionicons';

MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);

export default function Map() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [monumentHit, setMonumentHit] = useState(false);
    const route = useRoute();
    const mapRef = useRef(null);
    const [headingFrozen, setHeadingFrozen] = useState(false);

    const filteredHeading = useRef(0);
    const headingAnim = useRef(new Animated.Value(0)).current;

    const [heading, setHeading] = useState(0);

    const initialZoom = 19;
    const initialPitch = 70;

    const zoomOutLevel = 15;
    const zoomOutPitch = 0;
    const zoomOutBearing = 0;

    const [zoom, setZoom] = useState(initialZoom);
    const [pitch, setPitch] = useState(initialPitch);

    const monument = {latitude: 37.109673, longitude: -3.590427};

    const handleButtonPress = () => {
        if (!location?.coords) return;

        setPitch(initialPitch);
        setZoom(initialZoom);
        setHeading(zoomOutBearing);
        setHeadingFrozen(false);
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
            monument
        );

        if (dist < 20 && detectedLabels.length > 0 && !monumentHit) {
            alert("You did it!");
            setMonumentHit(true);
            // navigation.navigate("monument", { monument: 1 });
        }
    }, [route.params?.labels, location]);

    const showMonuments = () => {
        setZoom(zoomOutLevel);
        setPitch(zoomOutPitch);
        setHeading(zoomOutBearing);
    }

    const renderMap = () => {
        if (!location?.coords) {
            return (
                <View style={styles.centered}>
                    <Text>{errorMsg || "Loading location..."}</Text>
                </View>
            );
        }

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
                    <MapboxGL.UserLocation animated={true}/>
                    <MapboxGL.Camera
                        ref={mapRef}
                        heading={headingFrozen ? undefined : heading}
                        centerCoordinate={[location?.coords.longitude || 0, location?.coords.latitude || 0]}
                        animationMode="easeTo"
                        pitch={pitch}
                        zoomLevel={zoom}
                        animationDuration={1000}
                        minZoomLevel={12}
                    />
                    <MapboxGL.PointAnnotation
                        id="marker1"
                        coordinate={[-3.595152, 37.158607]}
                    >
                        <View style={styles.marker} />
                    </MapboxGL.PointAnnotation>
                </MapboxGL.MapView>
                <TouchableOpacity style={styles.roundButton} onPress={handleButtonPress}>
                    <Icon name="locate-outline" size={28} color="white" />
                </TouchableOpacity>
                <Button title={"Show monuments"} onPress={showMonuments} />
            </View>
        );
    };

    return <View style={styles.container}>{renderMap()}</View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    roundButton: {
        position: "absolute",
        bottom: 30,
        right: 20,
        width: 50,
        height: 50,
        backgroundColor: "#007AFF",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
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
        height: 30,
        backgroundColor: '#6684ff',
        borderRadius: 15,
        borderColor: 'white',
        borderWidth: 2,
    },
});
