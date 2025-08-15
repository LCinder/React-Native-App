import {LatLng} from "react-native-maps";

export type City = {
    PK: string,                     // CITY#{cityId}
    SK: string,                     // METADATA
    entityType: "City",
    cityId: number,
    name: string,
    country: string,
    imageUrl: string,
    coords: LatLng,
    GSI1PK?: string,                 // COUNTRY#{country}
    GSI1SK?: string;
};

export type Level = {
    PK: string,                     // CITY#{cityId}
    SK: string,                     // LEVEL#{levelId}
    entityType: "Level",
    levelId: string,
    cityId: number,
    difficulty: "basic" | "medium" | "hard",
    color: string,
    GSI2PK?: string,                 // LEVEL#{difficulty}
    GSI2SK?: string;
};

export type Route = {
    PK: string,                     // CITY#{cityId}#LEVEL#{levelId}
    SK: string,
    name: string,
    description: string,
    levelId: number;
}

export type MissionType = {
    PK: string,                     // CITY#{cityId}#LEVEL#{levelId}
    SK: string,                     // ROUTE#{routeId}
    entityType: "MissionType",
    routeId: string,
    name: string,
    description?: string,
    iconUrl?: string;
};

export type Monument = {
    PK: string,                     // CITY#{cityId}#LEVEL#{levelId}#ROUTE#{routeId}
    SK: string,                     // MONUMENT#{monumentId}
    entityType: "Monument",
    monumentId: number,
    cityId: number,
    name: string,
    coords: LatLng,
    imageUrl: string,
    clue?: string,
    GSI3PK?: string,                 // CITY#{cityId}
    GSI3SK?: string;                 // NAME#{monumentName}
};

export type MissionCatalog = {
    PK: string,                     // MISSION#{missionId}
    SK: string,                     // METADATA
    entityType: "MissionCatalog",
    missionId: string,
    title: string,
    cityId: number,
    routeId: string,
    stops: number,
    estimatedMinutes: number,
    GSI4PK?: string,                 // CITY#{cityId}#ROUTE#{routeId}
    GSI4SK?: string;
};

export type Profile = {
    PK: string,                     // USER#{userId}
    SK: string,                     // PROFILE
    entityType: "Profile",
    userId: string,
    displayName: string,
    totalPoints: number,
    level: string,
    totalPlayTimeMinutes: number,
    GSI5PK?: string,                 // RANKING#POINTS
    GSI5SK?: string;
};

export type MonumentDiscovery = {
    PK: string,                     // USER#{userId}
    SK: string,                     // MONUMENT#{monumentId}
    entityType: "UserMonument",
    userId: string,
    monumentId: number,
    name: string,
    cityId: number,
    cityName: string,
    routeId: string,
    discoveredAt: string,           // ISO 8601
    GSI6PK?: string,                 // CITY#{cityId}
    GSI6SK?: string;                 // USER#{userId}
};

export type UserMissionCompleted = {
    PK: string,                     // USER#{userId}
    SK: string,                     // MISSION#{missionId}
    entityType: "UserMissionCompleted",
    userId: string,
    missionId: string,
    title: string,
    cityId: number,
    routeId: string,
    completedAt: string,
    GSI7PK?: string,                 // CITY#{cityId}
    GSI7SK?: string;                 // MISSION#{missionId}
};

export type UserAchievement = {
    PK: string,                     // USER#{userId}
    SK: string,                     // ACHIEVEMENT#{achievementId}
    entityType: "UserAchievement",
    userId: string,
    achievementId: string,
    name: string,
    description: string,
    earnedAt: string,
    GSI8PK?: string,                 // ACHIEVEMENT#{achievementId}
    GSI8SK?: string;                 // USER#{userId}
};

export type UserTrivial = {
    PK: string,                     // USER#{userId}
    SK: string,                     // TRIVIAL#{trivialId}
    entityType: "UserTrivial",
    userId: string,
    trivialId: string,
    level: "basic" | "medium" | "hard",
    score: number,
    completedAt: string
};

export type MonumentsByCity = {
    cityId: number,
    cityName: string,
    monuments: MonumentDiscovery[];
};

export type CityObjectives = {
    cityId: number;
    cityName: string;
    monumentsDiscovered: MonumentDiscovery[];
    allMonuments?: Monument[];
    missionsCompleted: CompletedMission[];
    trivials?: UserTrivial[];
};


export type MonumentsResult = {
    count: number;
    monuments: MonumentDiscovery[];
};

export type CompletedMission = {
    missionId: string;
    title: string;
    cityId: number;
    routeId: string;
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
        list: MonumentDiscovery[];
    };
    missions: {
        total: number;
        list: CompletedMission[];
    };
    achievements: Achievement[];
    trivials: {
        total: number;
        averageScore: number;
    };
    totalPlayTimeMinutes: number;
};

export type CardItem = Monument | MissionType | Profile;

export type RootStackParamList = {
    "Home": undefined;
    "map-all-places": undefined;
    "main-tabs": { screen : string};
    "place-level": { place: { label: string, value: string } };
    "mission-type": { level: Level };
    "items": { level: Level; missionType: MissionType };
    "monument": { monument: Monument };
};

type MonumentLevel = {
    PK: string;             // e.g., MONUMENTLEVEL#{monumentId}#LEVEL#{levelId}
    SK: string;             // METADATA
    monumentId: number;
    levelId: number;
    difficulty: "basic" | "medium" | "hard";
    routeId: number;
};