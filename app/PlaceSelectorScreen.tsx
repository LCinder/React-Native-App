import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import { allActivePlaces } from "@/Helper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./HomeScreen";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "map-all-places">;

export default function PlaceSelectorScreen() {
    const navigation = useNavigation<NavigationProp>();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string | null>(null);

    const items = allActivePlaces.map((place) => ({
        label: place.name,
        value: place.name,
    }));

    const handleSelectPlace = (selectedValue: string | null) => {
        if (!selectedValue) return;
        const selectedPlace = allActivePlaces.find((p) => p.name === selectedValue);
        if (selectedPlace) {
            navigation.navigate("place-level", { place: selectedPlace });
        }
    };

    return (
        <View style={styles.map}>
            <Text style={styles.label}>Select a place</Text>
            <DropDownPicker
                open={open}
                setOpen={setOpen}
                value={value}
                setValue={setValue}
                items={items}
                placeholder="Select a place..."
                onChangeValue={handleSelectPlace}
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    map: { flex: 1, padding: 20, backgroundColor: "#fff" },
    label: { fontSize: 16, marginBottom: 10 },
    dropdown: { borderColor: "#ccc", borderRadius: 10 },
    dropdownContainer: { borderColor: "#ccc" },
});
