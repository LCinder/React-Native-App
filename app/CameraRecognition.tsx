import React, { useRef, useState } from "react";
import {Button, StyleSheet, Text, View, Image, ActivityIndicator} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { HUGGINGFACE_TOKEN } from '@env';


export default function CameraRecognition() {
    const [hasPermission, requestPermission] = useCameraPermissions();
    const [isCamera, setIsCamera] = useState(false);
    const [photoUri, setPhotoUri] = useState(null);
    const [labels, setLabels] = useState([]);
    const [loading, setLoading] = useState(false);
    const cameraRef = useRef(null);

    if (!hasPermission) return <View />;

    if (!hasPermission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>Needed permission</Text>
                <Button onPress={requestPermission} title="Give permission" />
            </View>
        );
    }

    async function analyzeImage(uri) {
        try {
            setLoading(true)
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

            const json = await res.json();
            setLabels(json);
            setLoading(false)
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async function takePhoto() {
        if (cameraRef.current && cameraRef.current.takePictureAsync) {
            try {
                const photo = await cameraRef.current.takePictureAsync();
                setPhotoUri(photo.uri);
                setIsCamera(false);
            } catch (e) {
                console.error("Error taking photo:", e);
            }
        } else {
            alert("ERROR");
        }
    }

    return loading ? (<View style={styles.container}><ActivityIndicator size="large" /></View>) :
        (
            isCamera ? (
                <View style={styles.container}>
                    <CameraView style={styles.camera} ref={cameraRef} />
                    <Button title="Take Photo" onPress={takePhoto} />
                    <Button title="Cancel" onPress={() => setIsCamera(false)} />
                </View>
            ) : (
                <View style={styles.container}>
                    <Button title="Open Camera" onPress={() => setIsCamera(true)} />
                    {photoUri && (
                        <>
                            <Image source={{ uri: photoUri }} style={styles.preview} />
                            <Button title="Analyze Photo" onPress={() => analyzeImage(photoUri)} />
                        </>
                    )}
                    <View style={styles.resultContainer}>
                        {labels.length > 0 ? (
                            labels.map((item, i) => (
                                <Text key={i}>
                                    {item.label} — {(item.score * 100).toFixed(2)}%
                                </Text>
                            ))
                        ) : (
                            <Text>No results yet</Text>
                        )}
                    </View>
                </View>
            )
        )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center" },
    message: { textAlign: "center", paddingBottom: 10 },
    camera: { flex: 1 },
    preview: { width: "100%", height: 300, marginVertical: 10 },
    resultContainer: { justifyContent: "center", alignItems: "center" },
});
