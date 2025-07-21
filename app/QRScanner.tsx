import React, {useEffect, useState} from "react";
import {Button, Dimensions, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {CameraView, useCameraPermissions} from "expo-camera";
import {useNavigation} from "@react-navigation/native";
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";


const {width} = Dimensions.get("window");
const boxSize = width * 0.7;
const frameWidth = 7;
const borderRadius = 20;


export default function QRScanner() {
    const [hasPermission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [qrData, setQrData] = useState<string | null>(null);
    const navigation = useNavigation();

    useEffect(() => {
        if (scanned) {
            navigation.goBack();
        }
    }, [scanned])


    if (!hasPermission) {
        return <View/>;
    }

    if (!hasPermission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>Needed permission</Text>
                <Button onPress={requestPermission} title="Give permission"/>
            </View>
        );
    }

    function handleBarcodeScanned({data}: { data: string }) {
        if (!scanned) {
            alert(`Data scanned: ${data}`);
            setScanned(true);
            setQrData(data);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {!scanned ? (
                <CameraView
                    style={styles.camera}
                    barcodeScannerSettings={{barcodeTypes: ["qr"]}}
                    onBarcodeScanned={handleBarcodeScanned}
                >
                    <FontAwesome6 name="x" iconStyle="solid" size={25} color={"#fff"} style={styles.closeButton}
                                  onPress={() => setScanned(!scanned)}/>
                    <View style={styles.frame}>
                        <View style={styles.cornerTopLeft}/>
                        <View style={styles.cornerTopRight}/>
                        <View style={styles.cornerBottomLeft}/>
                        <View style={styles.cornerBottomRight}/>
                    </View>
                </CameraView>
            ) : (
                <></>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: "center"},
    message: {textAlign: "center", paddingBottom: 10},
    camera: {flex: 1},
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "transparent",
        margin: 64,
    },
    button: {flex: 1, alignSelf: "flex-end", alignItems: "center"},
    text: {fontSize: 24, fontWeight: "bold", color: "white"},
    resultContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    resultText: {fontSize: 20, marginBottom: 10},
    qrData: {fontSize: 16, color: "gray"},
    closeButton: {
        position: "absolute",
        top: 40,
        right: 20,
        padding: 10,
    },
    closeButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    frame: {
        position: "absolute",
        top: "30%",
        left: "15%",
        width: boxSize,
        height: boxSize,
        borderColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    cornerTopLeft: {
        position: "absolute",
        top: 0,
        left: 0,
        width: 30,
        height: 30,
        borderTopWidth: frameWidth,
        borderLeftWidth: frameWidth,
        borderTopLeftRadius: borderRadius,
        borderColor: "white",
    },
    cornerTopRight: {
        position: "absolute",
        top: 0,
        right: 0,
        width: 30,
        height: 30,
        borderTopWidth: frameWidth,
        borderRightWidth: frameWidth,
        borderColor: "white",
        borderTopRightRadius: borderRadius
    },
    cornerBottomLeft: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: 30,
        height: 30,
        borderBottomWidth: frameWidth,
        borderLeftWidth: frameWidth,
        borderColor: "white",
        borderBottomLeftRadius: borderRadius,
    },
    cornerBottomRight: {
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 30,
        height: 30,
        borderBottomWidth: frameWidth,
        borderRightWidth: frameWidth,
        borderBottomRightRadius: borderRadius,
        borderColor: "white",
    },
});
