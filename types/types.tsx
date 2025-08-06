import {LatLng} from "react-native-maps";

export type Place = {
    id: number,
    coords: LatLng,
    name: string;
};

export type Level = {
    id: number,
    difficulty: string,
    color: string,
    targets: Target[]
};

export type MissionType = {
    id: number,
    name: string;
};

export type Target = {
    id: number,
    name: string,
    type: string,
    strange: string,
    image_url: string,
    missionType: string,
    clue: string,
    place: Place,
    registered: boolean;
};

export type LabelValue = {
    label: string,
    value: string;
}

export type RootStackParamList = {
    "map-all": undefined;
    "place-level": { place: LabelValue };
    "mission-type": { level: Level };
    "items": { level: Level; missionType: MissionType };
    "item": { item: Target };
};