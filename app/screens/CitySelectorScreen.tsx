import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {useNavigation} from "@react-navigation/native";
import { fetchAllCities } from "@/utils/Helper";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {City, RootStackParamList} from "@/types/types";
import {useMonuments} from "@/app/contexts/MonumentsContext";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "map-all-places">;

export default function CitySelectorScreen() {
    const navigation = useNavigation<NavigationProp>();
    const [open, setOpen] = useState(false);
    const [cityIdSelected, setCityIdSelected] = useState<number>({});
    const [allActivePlaces, setAllActivePlaces] = useState<City[]>([]);
    const {setCity} = useMonuments();

    useEffect(() => {
        const activePlaces = fetchAllCities();

        setAllActivePlaces(activePlaces)
    }, []);

    const handleSelectPlace = (cityIdSelected: number | null) => {
        if (!cityIdSelected) return;
        const selectedPlace = allActivePlaces.find((c: City) => c.cityId === `${cityIdSelected}`);

        if (selectedPlace) {
            setCity(selectedPlace);
            navigation.goBack();
        }
    };

    return (
        <View style={styles.map}>
            <Text style={styles.label}>Select a place</Text>
            <DropDownPicker
                open={open}
                setOpen={setOpen}
                value={cityIdSelected}
                setValue={setCityIdSelected}
                items={allActivePlaces.map((c) => ({label: c.name, value: c.cityId}))}
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
