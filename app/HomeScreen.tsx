import React, {useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {useNavigation} from "@react-navigation/native";
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import {fetch} from "expo/fetch";
import {fetchData} from "../Helper";

export type RootStackParamList = {
    Home: undefined;
    Location: undefined;
    QRScanner: undefined;
    ContainerList: { data: { id: string; name: string, type: string, strange: string, image_url: string, registered: boolean }[] };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
    const navigation = useNavigation<NavigationProp>();
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData()
            .then(res => setData(res))
    }, []);


    /*const data = [
        {id: "1", name: "Element 1", type: "Type 1", strange: "low"},
        {id: "2", name: "Element 2", type: "Type 2", strange: "medium"},
        {id: "3", name: "Element 3", type: "Type 3", strange: "low"},
        {id: "4", name: "Element 4", type: "Type 4", strange: "low"},
        {id: "5", name: "Element 5", type: "Type 2", strange: "high"},
        {id: "6", name: "Element 6", type: "Type 3", strange: "low"},
        {id: "7", name: "Element 7", type: "Type 4", strange: "high"},
        {id: "8", name: "Element 5", type: "Type 2", strange: "high"},
        {id: "9", name: "Element 6", type: "Type 3", strange: "low"},
        {id: "10", name: "Element 7", type: "Type 4", strange: "low"},
        {id: "11", name: "Element 5", type: "Type 3", strange: "low"},
        {id: "12", name: "Element 6", type: "Type 2", strange: "low"},
        {id: "13", name: "Element 7", type: "Type 5", strange: "low"},
        {id: "14", name: "Element 5", type: "Type 5", strange: "low"},
        {id: "15", name: "Element 6", type: "Type 1", strange: "low"},
    ];*/


    return (
        <View style={styles.container}>
            <FontAwesome6 name="camera" iconStyle="solid" size={50} color={"#638eec"}
                          onPress={() => navigation.navigate("qrscanner")}/>

            <FontAwesome6 name="location-dot" iconStyle="solid" size={50} color={"#638eec"}
                          onPress={() => navigation.navigate("location")}/>

            <FontAwesome6 name="table-list" iconStyle="solid" size={50} color={"#638eec"}
                          onPress={() => navigation.navigate("table", {data: data})}/>

            <FontAwesome6 name="camera" iconStyle="solid" size={50} color={"#638eec"}
                          onPress={() => navigation.navigate("camerarecognition")}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
        paddingHorizontal: 20,
    },
});
