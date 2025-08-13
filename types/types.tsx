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
    type: "mission",
    name: string;
};

export type Monument = {
    id: string;
    name: string;
    city: string;
    imageUrl: string;
};

export type Target = {
    id: number,
    name: string,
    type: string,
    difficulty: string,
    image_url: string,
    missionType: string,
    clue: string,
    place: Place,
    registered: boolean;
};

export type MonumentsByCity = {
    city: string;
    monuments: Monument[];
};

export type LabelValue = {
    label: string,
    value: string;
}

export type Profile = {
    id: number,
    name: string,
    total_points: number;
}

export type MonumentDiscovery = {
    monumentId: string;
    name: string;
    city: string;
    dateDiscovered: string;
};

export type MonumentsResult = {
    count: number;
    monuments: MonumentDiscovery[];
};


export type CompletedMission = {
    missionId: string;
    title: string;
    city: string;
    route: string;
    completedAt: string;
};

export type Achievement = {
    id: string;
    name: string;
    description: string;
    unlockedAt: string;
};

export type TrivialStats = {
    trivialsCompleted: number;
    averageScore: number;
};

export type PlayerStats = {
    totalPoints: number;
    monuments: {
        count: number;
        list: Target[];
    };
    missions: {
        total: number;
        list: MissionType[];
    };
    achievements: Achievement[];
    trivials: {
        total: number;
        averageScore: number;
       // list: Trivial[];
    };
    totalPlayTimeMinutes: number;
};

export type CardItem = Target | MissionType | Profile;

export type RootStackParamList = {
    "Home": undefined;
    "map-all-places": undefined;
    "main-tabs": { screen : string};
    "place-level": { place: LabelValue };
    "mission-type": { level: Level };
    "items": { level: Level; missionType: MissionType };
    "target": { target: Target };
};
