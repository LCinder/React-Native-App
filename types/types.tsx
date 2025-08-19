import { LatLng } from "react-native-maps";

// ================== CORE ENTITIES ==================

export type City = {
    PK: `CITY#${string}`;
    SK: "METADATA";

    entityType: "City";
    cityId: string;
    name: string;
    country: string;
    imageUrl: string;
    coords: LatLng;

    GSI1PK: `COUNTRY#${string}`;
    GSI1SK: `CITY#${string}`;
};

export type Level = {
    PK: `CITY#${string}`;
    SK: `LEVEL#${string}`;

    entityType: "Level";
    levelId: string;
    cityId: string;
    difficulty: "basic" | "medium" | "hard";
    color: string;

    GSI1PK: `DIFFICULTY#${string}`;
    GSI1SK: `CITY#${string}#LEVEL#${string}`;
};

export type Route = {
    PK: `CITY#${string}`;
    SK: `ROUTE#${string}`;

    entityType: "Route";
    routeId: string;
    cityId: string;
    cityName: string;
    title: string;
    description: string;
    theme: string;            // "Legends" | "Adventure" | "History"
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    estimatedDurationMinutes: number;

    monumentIds: string[];

    createdAt: string;        // ISO 8601

    GSI1PK?: `ROUTE#${string}`;
    GSI1SK?: `CITY#${string}`;
    GSI2PK?: `THEME#${string}`;
    GSI2SK?: `ROUTE#${string}`;
    GSI3PK?: `DIFFICULTY#${string}`;
    GSI3SK?: `CITY#${string}#ROUTE#${string}`;
};

export type Monument = {
    PK: `ROUTE#${string}`;
    SK: `MONUMENT#${string}`;

    entityType: "Monument";
    monumentId: string;
    routeId: string;
    cityId: string;
    name: string;
    description: string;
    coords: LatLng;
    imageUrl: string;
    clue?: string;

    GSI1PK: `MONUMENT#${string}`;
    GSI1SK: `CITY#${string}`;
    GSI2PK?: `CITY#${string}`;
    GSI2SK?: `MONUMENT#${string}`;
};

// ================== MISSIONS & ACHIEVEMENTS ==================
type MissionActivity =
    | { type: "DISCOVER_MONUMENTS"; target: number; monumentIds: string[] }
    | { type: "FIND_OBJECTS"; target: number }
    | { type: "TRIVIA"; target: number; questions?: string[] };

export type Mission = {
    PK: `ROUTE#${string}`;
    SK: `MISSION#${string}`;

    missionId: string;
    routeId: string;
    cityId: string;
    cityName: string;

    title: string;
    description: string;

    activities: MissionActivity[];

    reward: {
        achievementId?: string;
        xp?: number;
        points?: number;
    };

    GSI1PK: `MISSION#${string}`;
    GSI1SK: `ROUTE#${string}`;
};

export type Achievement = {
    PK: "ACHIEVEMENT";
    SK: `ACHIEVEMENT#${string}`;

    entityType: "Achievement";
    achievementId: string;
    name: string;
    description: string;
    iconUrl?: string;
    pointsReward: number;
    createdAt: string;

    GSI1PK: `ACHIEVEMENT#GLOBAL`;
    GSI1SK: `CREATED_AT#${string}`;
};

// ================== USER DATA ==================

export type UserProfile = {
    PK: `USER#${string}`;
    SK: "PROFILE";

    entityType: "UserProfile";
    userId: string;
    username: string;
    xp: number;
    level: string;
    totalPlayTimeMinutes: number;
    createdAt: string;       // ISO Date

    GSI1PK: `EMAIL#${string}`;
    GSI1SK: `USER#${string}`;
    GSI2PK: "USER_RANKING";
    GSI2SK: `XP#${number}`;
};

export type UserMonumentDiscovery = {
    PK: `USER#${string}`;
    SK: `MONUMENT#${string}`;

    entityType: "UserMonumentDiscovery";
    userId: string;
    monumentId: string;
    monumentName: string;
    cityId: string;
    cityName: string;
    routeId: string;
    discoveredAt: string;     // ISO 8601
    pointsEarned: number;
    
    GSI1PK: `MONUMENT#${string}`;
    GSI1SK: `USER#${string}`;
    GSI2PK?: `CITY#${string}`;
    GSI2SK?: `USER#${string}`;
    GSI3PK: `USER#${string}`;
    GSI3SK: `DISCOVERY_DATE#${string}`;
};

export type UserMissionProgress = {
    PK: `USER#${string}`;
    SK: `MISSION#${string}`;

    entityType: "UserMissionProgress";
    userId: string;
    missionId: string;
    routeId: string;
    cityId: string;

    status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

    progress: {
        activityType: MissionActivity["type"];
        current: number;
        target: number;
        monumentIdsCompleted?: string[];
    }[];

    lastUpdated: string;      // ISO 8601
    completedAt?: string;

    GSI1PK: `MISSION#${string}`;
    GSI1SK: `USER#${string}`;
    GSI2PK: `USER#${string}`;
    GSI2SK: `MISSION_STATUS#${"COMPLETED" | "IN_PROGRESS"}`;
};

export type UserAchievement = {
    PK: `USER#${string}`;
    SK: `ACHIEVEMENT#${string}`;

    entityType: "UserAchievement";
    userId: string;
    achievementId: string;
    achievedAt: string;       // ISO 8601
    pointsEarned: number;

    GSI1PK: `ACHIEVEMENT#${string}`;
    GSI1SK: `USER#${string}`;
};

export type UserTrivial = {
    PK: `USER#${string}`;
    SK: `TRIVIAL#${string}`;

    entityType: "UserTrivial";
    userId: string;
    trivialId: string;
    missionId?: string;
    level: "basic" | "medium" | "hard";
    score: number;
    completedAt: string;

    GSI1PK: `USER#${string}`;
    GSI1SK: `TRIVIAL_DATE#${string}`;
    GSI2PK: `TRIVIAL#${string}`;
    GSI2SK: `USER#${string}`;
};

// ================== STATS / SUMMARIES ==================

export type MonumentsByCitySummary = {
    PK: `USER#${string}`;
    SK: `CITY_SUMMARY#${string}`;

    cityId: string;
    cityName: string;
    monumentsCount: number;

    recentMonuments?: {
        monumentId: string;
        name: string;
        cityId: string;
        cityName: string;
        discoveredAt: string;
    }[];
};

export type UserStatsSummaryTable = {
    PK: `USER#${string}`;
    SK: "STATS_SUMMARY";

    userId: string;
    totalPoints: number;
    level: string;
    totalPlayTimeMinutes: number;
    lastActiveAt: string;     // ISO 8601

    monumentsCount: number;
    missionsCount: number;
    achievementsCount: number;

    trivials?: {
        total: number;
        averageScore: number;
    };

    recentAchievements?: {
        achievementId: string;
        title: string;
        description: string;
        achievedAt: string;
    }[];

    recentMonuments?: MonumentsByCitySummary[];

    GSI1PK: "GLOBAL_RANKING";
    GSI1SK: `POINTS#${number}`;
};

// ================== FRONTEND NAVIGATION ==================

export type CardItem = Monument | UserProfile;

export type RootStackParamList = {
    "Home": undefined;
    "map-all-places": undefined;
    "main-tabs": { screen: string };
    "place-level": { place: { label: string; value: string } };
    "items": { level: Level; route: Route };
    "monument": { monument: Monument };
};
