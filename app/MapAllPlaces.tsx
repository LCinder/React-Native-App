import React from "react";
import {StyleSheet, View} from "react-native";
import MapView, {Marker, UrlTile} from "react-native-maps";
import {useNavigation} from "@react-navigation/native";
import {allActivePlaces} from "@/Helper";

export default function MapAllPlaces() {

    const navigation = useNavigation();

    return (
        <View style={styles.map}>
            <MapView
                style={styles.map}
                showsUserLocation
                followsUserLocation
            >
                <UrlTile
                    urlTemplate="https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=TI32OVxxl9rThTmshOHA"
                />
                {allActivePlaces.map((place, key) =>
                    <Marker key={key} coordinate={{latitude: parseFloat(place.latitude), longitude: parseFloat(place.longitude)}} onPress={() => navigation.navigate("place-level", {place: place})}/>
                )}
            </MapView>
        </View>
    );

}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
});
