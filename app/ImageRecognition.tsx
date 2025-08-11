import React from 'react'
import {useNavigation} from "@react-navigation/native";

function ImageRecognition() {
    const navigation = useNavigation();

    const handleTakePhoto = () => {
        navigation.navigate("camerarecognition", {
            onReturn: (labels) => {
                if (!labels || labels.length === 0) {
                    alert("No labels detected.");
                    return;
                }

                const labelText = labels.map(
                    target => `${target.label} — ${(target.score * 100).toFixed(2)}%`
                ).join("\n");

                alert("Labels:\n" + labelText);
                // navigation.navigate("target", { target: 1 });
            }
        });
    };
}

export default ImageRecognition
