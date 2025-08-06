import React from "react";
import { Target, MissionType } from "@/types/types";
import { CardMissionType } from "@/app/CardMissionType";
import { CardTarget } from "@/app/CardTarget";

type CardProps =
    | { target: Target; onPress: (target: Target) => void }
    | { target: MissionType; onPress: (target: MissionType) => void };

export default function Card({ target, onPress }: Readonly<CardProps>) {
    if (isTarget(target)) {
        return <CardTarget target={target} onPress={onPress} />;
    } else {
        return <CardMissionType target={target} onPress={onPress as (target: MissionType) => void} />;
    }
}

function isTarget(target: Target | MissionType) {
    return "registered" in target;
}
