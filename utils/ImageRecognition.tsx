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
                    monument => `${monument.label} — ${(monument.score * 100).toFixed(2)}%`
                ).join("\n");

                alert("Labels:\n" + labelText);
                // navigation.navigate("monument", { monument: 1 });
            }
        });
    };
}

export default ImageRecognition
