import React from "react";
import {Target, MissionType, CardItem} from "@/types/types";
import { CardMissionType } from "@/app/CardMissionType";
import { CardTarget } from "@/app/CardTarget";
import {CardDefault} from "@/app/CardDefault";

type CardProps = | { item: CardItem; onPress: (item: CardItem) => void };

export default function Card({ item, onPress }: Readonly<CardProps>) {
    if (isTarget(item)) {
        return <CardTarget target={item} onPress={onPress} />;
    } else if(isMissionType(item)) {
        return <CardMissionType target={item} onPress={onPress as (item: CardItem) => void} />;
    } else {
        return <CardDefault item={item} onPress={onPress} />
    }
}

const isTarget = (item: any) => {
    return "registered" in item;
}

const isMissionType = (item: any) => {
    return item.type === "mission";
}

