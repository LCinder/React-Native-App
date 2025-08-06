import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {useNavigation} from "@react-navigation/native";
import {fetchAllActivePlaces} from "@/utils/Helper";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {LabelValue, Place, RootStackParamList} from "@/types/types";
import {useTargets} from "@/app/TargetsContext";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "map-all-places">;

export default function PlaceSelectorScreen() {
    const navigation = useNavigation<NavigationProp>();
    const [open, setOpen] = useState(false);
    const [place, setPlace] = useState<string>("");
    const [allActivePlaces, setAllActivePlaces] = useState<LabelValue[]>([]);
    const {setZone} = useTargets();

    useEffect(() => {
        const activePlaces = fetchAllActivePlaces();

        const items = activePlaces.map((place: Place) => ({
            label: place.name,
            value: place.name,
        }));

        setAllActivePlaces(items)
    }, []);

    const handleSelectPlace = (selectedValue: string | null) => {
        if (!selectedValue) return;
        const selectedPlace = allActivePlaces.find((p: LabelValue) => p.value === selectedValue);

        if (selectedPlace) {
            setZone(selectedPlace.value);
            navigation.goBack();
        }
    };

    return (
        <View style={styles.map}>
            <Text style={styles.label}>Select a place</Text>
            <DropDownPicker
                open={open}
                setOpen={setOpen}
                value={place}
                setValue={setPlace}
                items={allActivePlaces}
                placeholder="Select a place..."
                onChangeValue={handleSelectPlace}
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    map: {flex: 1, padding: 20, backgroundColor: "#fff"},
    label: {fontSize: 16, marginBottom: 10},
    dropdown: {borderColor: "#ccc", borderRadius: 10},
    dropdownContainer: {borderColor: "#ccc"},
});
