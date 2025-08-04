import React from "react";
import {Target, MissionType} from "@/types/types";
import {CardMissionType} from "@/app/CardMissionType";
import {CardTarget} from "@/app/CardTarget";

export default function Card({item, onPress}: { item: Target | MissionType; onPress: (item: Target | MissionType) => void }) {
    if (isTarget(item)) {
        return <CardTarget item={item} onPress={onPress} />;
    } else {
        return <CardMissionType item={item} onPress={onPress} />;
    }
}

function isTarget(item: any): item is Target {
    return "registered" in item;
}
