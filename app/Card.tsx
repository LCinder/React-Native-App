import React from "react";
import { Target, MissionType } from "@/types/types";
import { CardMissionType } from "@/app/CardMissionType";
import { CardTarget } from "@/app/CardTarget";

type CardProps =
    | { item: Target; onPress: (item: Target) => void }
    | { item: MissionType; onPress: (item: MissionType) => void };

export default function Card({ item, onPress }: Readonly<CardProps>) {
    if (isTarget(item)) {
        return <CardTarget item={item} onPress={onPress} />;
    } else {
        return <CardMissionType item={item} onPress={onPress as (item: MissionType) => void} />;
    }
}

function isTarget(item: Target | MissionType): item is Target {
    return "registered" in item;
}
