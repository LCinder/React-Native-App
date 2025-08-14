import React from "react";
import {CardItem} from "@/types/types";
import {CardMissionType} from "@/app/CardMissionType";
import {CardMonument} from "@/app/CardMonument";
import {CardDefault} from "@/app/CardDefault";

type CardProps = | { item: CardItem; onPress: (item: CardItem) => void };

export default function Card({item, onPress}: Readonly<CardProps>) {
    if (isMonument(item)) {
        return <CardMonument monument={item} onPress={onPress}/>;
    } else if (isMissionType(item)) {
        return <CardMissionType monument={item} onPress={onPress as (item: CardItem) => void}/>;
    } else {
        return <CardDefault item={item} onPress={onPress}/>
    }
}

const isMonument = (item: any) => {
    return item.entityType === "Monument";
}

const isMissionType = (item: any) => {
    return item.entityType === "MissionType";
}

