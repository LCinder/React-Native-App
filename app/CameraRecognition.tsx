import React, { useRef, useState } from "react";
import {
    Button,
    StyleSheet,
    Text,
    View,
    Image,
    ActivityIndicator,
    Alert,
    ScrollView,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { HUGGINGFACE_TOKEN } from '@env';

export default function CameraRecognition({ route, navigation }) {
    const [hasPermission, requestPermission] = useCameraPermissions();
    const [isCamera, setIsCamera] = useState(false);
    const [photoUri, setPhotoUri] = useState(null);
    const [labels, setLabels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const cameraRef = useRef(null);

    if (!hasPermission) return <View />;

    if (!hasPermission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>Camera permission is required</Text>
                <Button onPress={requestPermission} title="Grant Permission" />
            </View>
        );
    }

    async function analyzeImage(uri) {
        setError(null);
        setLoading(true);
        setLabels([]);
        try {
            const response = await fetch(uri);
            const blob = await response.blob();

            const res = await fetch(
                "https://api-inference.huggingface.co/models/google/vit-base-patch16-224",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${HUGGINGFACE_TOKEN}`,
                        "Content-Type": "application/octet-stream",
                    },
                    body: blob,
                }
            );

            if (!res.ok) {
                throw new Error(`Inference API error: ${res.status} ${res.statusText}`);
            }

            const json = await res.json();
            setLabels(json);
            if (route.params?.onReturn) {
                route.params.onReturn(json);
            }
            navigation.goBack();
        } catch (e) {
            console.error("Error analyzing image:", e);
            setError("Failed to analyze image. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    async function takePhoto() {
        if (cameraRef.current && cameraRef.current.takePictureAsync) {
            try {
                const photo = await cameraRef.current.takePictureAsync();
                setPhotoUri(photo.uri);
                setIsCamera(false);
                setLabels([]);
                setError(null);
            } catch (e) {
                Alert.alert("Error", "Failed to take photo.");
                console.error("Error taking photo:", e);
            }
        } else {
            Alert.alert("Error", "Camera is not ready.");
        }
    }

    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator size="large" />}
            {!loading && (
                <>
                    {isCamera ? (
                        <View style={styles.cameraContainer}>
                            <CameraView style={styles.camera} ref={cameraRef} />
                            <View style={styles.buttonsRow}>
                                <Button title="Take Photo" onPress={takePhoto} />
                                <Button title="Cancel" onPress={() => setIsCamera(false)} />
                            </View>
                        </View>
                    ) : (
                        <ScrollView contentContainerStyle={styles.content}>
                            <Button title="Open Camera" onPress={() => setIsCamera(true)} />
                            {photoUri && (
                                <>
                                    <Image source={{ uri: photoUri }} style={styles.preview} />
                                    <Button title="Analyze Photo" onPress={() => analyzeImage(photoUri)} />
                                </>
                            )}
                            {error && <Text style={styles.error}>{error}</Text>}
                            <View style={styles.resultContainer}>
                                {labels.length > 0 ? (
                                    labels.map((monument, i) => (
                                        <Text key={i}>
                                            {monument.label} — {(monument.score * 100).toFixed(2)}%
                                        </Text>
                                    ))
                                ) : (
                                    <Text>No results yet</Text>
                                )}
                            </View>
                        </ScrollView>
                    )}
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 16 },
    message: { textAlign: "center", paddingBottom: 10, fontSize: 16 },
    cameraContainer: { flex: 1 },
    camera: { flex: 1, borderRadius: 10, overflow: "hidden" },
    buttonsRow: { flexDirection: "row", justifyContent: "space-around", paddingVertical: 10 },
    preview: { width: "100%", height: 300, marginVertical: 10, borderRadius: 10 },
    resultContainer: { justifyContent: "center", alignItems: "center", padding: 20 },
    error: { color: "red", textAlign: "center", marginVertical: 10 },
    content: { flexGrow: 1, justifyContent: "center" },
});
