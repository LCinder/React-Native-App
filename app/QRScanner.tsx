import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function QRScanner() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [hasPermission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(true);
    const [qrData, setQrData] = useState<string | null>(null);

    if (!hasPermission) {
        return <View />;
    }

    if (!hasPermission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>Necesitamos permiso para usar la cámara</Text>
                <Button onPress={requestPermission} title="Dar permiso" />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing((current) => (current === 'back' ? 'front' : 'back'));
    }

    function handleBarcodeScanned({ data }: { data: string }) {
        if (!scanned) {
            setScanned(true);
            setQrData(data);
            alert(`Data scanned: ${data}`);
        }
    }

    return (
        <View style={styles.container}>
            {!scanned ? (
                <CameraView
                    style={styles.camera}
                    facing={facing}
                    barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
                    onBarcodeScanned={handleBarcodeScanned}
                >
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setScanned(!scanned)}
                    >
                        <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>
                </CameraView>
            ) : (
                <View style={styles.resultContainer}>
                    {qrData &&
                        <View>
                            <Text style={styles.resultText}>Data:</Text>
                            <Text style={styles.qrData}>{qrData}</Text>
                        </View>
                    }

                    <Icon name="camera" size={30} color={"#638eec"} onPress={() => setScanned(false)}></Icon>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center' },
    message: { textAlign: 'center', paddingBottom: 10 },
    camera: { flex: 1 },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: { flex: 1, alignSelf: 'flex-end', alignItems: 'center' },
    text: { fontSize: 24, fontWeight: 'bold', color: 'white' },
    resultContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    resultText: { fontSize: 20, marginBottom: 10 },
    qrData: { fontSize: 16, color: 'gray' },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        padding: 10,
        zIndex: 10,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
