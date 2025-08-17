import {
    City,
    Level,
    Monument,
    UserMonumentDiscovery,
    Route,
    Mission,
    Achievement,
    UserProfile,
    UserStatsSummaryTable,
    MonumentsByCitySummary,
    UserTrivial,
    UserAchievement,
    UserMissionProgress
} from "@/types/types";
import { LatLng } from "react-native-maps";

const colors = ["#AD8A56", "#B4B4B4", "#AF9500", "#000000"];
export const colorPalette = ["#5d737e", "#64b6ac", "#c0fdfb", "#daffef", "#fcfffd"];


// -------------------- COLORS --------------------
export const findColorByLevel = (level: Level) => {
    switch (level.difficulty) {
        case "basic":
            return colors[0];
        case "medium":
            return colors[1];
        case "hard":
            return colors[2];
        default:
            return colors[3];
    }
};

export function findColorByItem(monument: Monument) {
    if (!monument) return "#000";
    return colors[1];
}

// ================== CORE ENTITIES ==================

export const fetchCity = (): City => {
    return {
        PK: "CITY#1",
        SK: "METADATA",
        entityType: "City",
        cityId: "1",
        name: "Florence",
        country: "Italy",
        imageUrl: "https://example.com/florence.jpg",
        coords: { latitude: 43.7696, longitude: 11.2558 },
        GSI1PK: "COUNTRY#Italy",
        GSI1SK: "CITY#1"
    };
};

export const fetchLevels = (cityId: string): Level[] => {
    return [
        {
            PK: `CITY#${cityId}`,
            SK: "LEVEL#1",
            entityType: "Level",
            levelId: "1",
            cityId,
            difficulty: "basic",
            color: "#FFD700",
            GSI1PK: "DIFFICULTY#basic",
            GSI1SK: `CITY#${cityId}#LEVEL#1`
        },
        {
            PK: `CITY#${cityId}`,
            SK: "LEVEL#2",
            entityType: "Level",
            levelId: "2",
            cityId,
            difficulty: "medium",
            color: "#C0C0C0",
            GSI1PK: "DIFFICULTY#medium",
            GSI1SK: `CITY#${cityId}#LEVEL#2`
        }
    ];
};

export const fetchRoutes = (cityId: string): Route[] => {
    return [
        {
            PK: `CITY#${cityId}`,
            SK: "ROUTE#FLORENCE_LEGENDS",
            entityType: "Route",
            routeId: "FLORENCE_LEGENDS",
            cityId,
            cityName: "Florence",
            title: "Legends of Florence",
            description: "Discover myths and legends hidden in Florence.",
            theme: "Legends",
            difficulty: "Intermediate",
            estimatedDurationMinutes: 120,
            monumentIds: ["201", "202", "203"],
            createdAt: "2025-08-01T10:00:00Z",
            GSI1PK: "ROUTE#FLORENCE_LEGENDS",
            GSI1SK: `CITY#${cityId}`,
            GSI2PK: "THEME#Legends",
            GSI2SK: "ROUTE#FLORENCE_LEGENDS",
            GSI3PK: "DIFFICULTY#Intermediate",
            GSI3SK: `CITY#${cityId}#ROUTE#FLORENCE_LEGENDS`
        }
    ];
};

export const fetchMonuments = (routeId: string): Monument[] => {
    return [
        {
            PK: `ROUTE#${routeId}`,
            SK: "MONUMENT#201",
            entityType: "Monument",
            monumentId: "201",
            routeId,
            cityId: "1",
            name: "Ponte Vecchio",
            description: "Historic bridge over the Arno river.",
            coords: { latitude: 43.7679, longitude: 11.2536 },
            imageUrl: "https://example.com/ponte_vecchio.jpg",
            GSI1PK: "MONUMENT#201",
            GSI1SK: "CITY#1"
        },
        {
            PK: `ROUTE#${routeId}`,
            SK: "MONUMENT#202",
            entityType: "Monument",
            monumentId: "202",
            routeId,
            cityId: "1",
            name: "Santa Maria del Fiore",
            description: "Florence's famous cathedral.",
            coords: { latitude: 43.7731, longitude: 11.2560 },
            imageUrl: "https://example.com/santa_maria.jpg",
            GSI1PK: "MONUMENT#202",
            GSI1SK: "CITY#1"
        }
    ];
};

export const fetchMonumentsByCity = (cityId: string): Monument[] => {
    if (cityId !== "1") return []; // Solo Florencia en este mock

    return [
        {
            PK: "ROUTE#FLORENCE_LEGENDS",
            SK: "MONUMENT#PONTE_VECCHIO",
            entityType: "Monument",
            monumentId: "PONTE_VECCHIO",
            routeId: "FLORENCE_LEGENDS",
            cityId: "1",
            name: "Ponte Vecchio",
            description: "The famous medieval bridge over the Arno River.",
            coords: { latitude: 43.7678, longitude: 11.2532 } as LatLng,
            imageUrl: "https://example.com/images/ponte_vecchio.jpg",
            clue: "Look for the shops along the bridge.",
            GSI1PK: "MONUMENT#PONTE_VECCHIO",
            GSI1SK: "CITY#1",
        },
        {
            PK: "ROUTE#FLORENCE_LEGENDS",
            SK: "MONUMENT#SANTA_MARIA_DEL_FIORE",
            entityType: "Monument",
            monumentId: "SANTA_MARIA_DEL_FIORE",
            routeId: "FLORENCE_LEGENDS",
            cityId: "1",
            name: "Santa Maria del Fiore",
            description: "Florence's cathedral with the iconic dome by Brunelleschi.",
            coords: { latitude: 43.7731, longitude: 11.2560 } as LatLng,
            imageUrl: "https://example.com/images/santa_maria_del_fiore.jpg",
            clue: "Check out the impressive dome from outside.",
            GSI1PK: "MONUMENT#SANTA_MARIA_DEL_FIORE",
            GSI1SK: "CITY#1",
        },
        {
            PK: "ROUTE#FLORENCE_LEGENDS",
            SK: "MONUMENT#PALAZZO_VECCHIO",
            entityType: "Monument",
            monumentId: "PALAZZO_VECCHIO",
            routeId: "FLORENCE_LEGENDS",
            cityId: "1",
            name: "Palazzo Vecchio",
            description: "The historic town hall of Florence, overlooking Piazza della Signoria.",
            coords: { latitude: 43.7692, longitude: 11.2558 } as LatLng,
            imageUrl: "https://example.com/images/palazzo_vecchio.jpg",
            clue: "Find the massive tower and statue outside.",
            GSI1PK: "MONUMENT#PALAZZO_VECCHIO",
            GSI1SK: "CITY#1",
        },
    ];
};


// ================== MISSIONS & ACHIEVEMENTS ==================

export const fetchMissions = (routeId: string): Mission[] => {
    return [
        {
            PK: `ROUTE#${routeId}`,
            SK: "MISSION#1",
            missionId: "1",
            routeId,
            cityId: "1",
            cityName: "Florence",
            title: "Discover the Old City",
            description: "Find key monuments in Florence.",
            activities: [
                { type: "DISCOVER_MONUMENTS", target: 3, monumentIds: ["201", "202", "203"] }
            ],
            reward: { xp: 100, points: 50 },
            GSI1PK: "MISSION#1",
            GSI1SK: `ROUTE#${routeId}`
        }
    ];
};

export const fetchAchievements = (): Achievement[] => {
    return [
        {
            PK: "ACHIEVEMENT",
            SK: "ACHIEVEMENT#DISCOVERER",
            entityType: "Achievement",
            achievementId: "DISCOVERER",
            name: "Master Discoverer",
            description: "Complete all missions in Florence.",
            pointsReward: 200,
            createdAt: "2025-08-01T12:00:00Z",
            GSI1PK: "ACHIEVEMENT#GLOBAL",
            GSI1SK: "CREATED_AT#2025-08-01T12:00:00Z"
        }
    ];
};

// ================== USER DATA ==================

export const fetchUserProfile = (userId: string): UserProfile => {
    return {
        PK: `USER#${userId}`,
        SK: "PROFILE",
        entityType: "UserProfile",
        userId,
        username: "FlorenceFan",
        xp: 1500,
        level: "Intermediate",
        totalPlayTimeMinutes: 240,
        createdAt: "2025-08-01T09:00:00Z",
        GSI1PK: "EMAIL#florencefan@example.com",
        GSI1SK: `USER#${userId}`,
        GSI2PK: "USER_RANKING",
        GSI2SK: `XP#1500`
    };
};

export const fetchUserMonumentDiscoveries = (userId: string): UserMonumentDiscovery[] => {
    return [
        {
            PK: `USER#${userId}`,
            SK: "MONUMENT#201",
            entityType: "UserMonumentDiscovery",
            userId,
            monumentId: "201",
            monumentName: "Ponte Vecchio",
            cityId: "1",
            cityName: "Florence",
            routeId: "FLORENCE_LEGENDS",
            discoveredAt: "2025-08-10T10:00:00Z",
            pointsEarned: 20,
            GSI1PK: "MONUMENT#201",
            GSI1SK: `USER#${userId}`,
            GSI3PK: `USER#${userId}`,
            GSI3SK: "DISCOVERY_DATE#2025-08-10T10:00:00Z"
        }
    ];
};
// ================== USER DATA ==================

export const fetchUserMissionProgress = (userId: string): UserMissionProgress[] => {
    return [
        {
            PK: `USER#${userId}`,
            SK: "MISSION#1",
            entityType: "UserMissionProgress",
            userId,
            missionId: "1",
            routeId: "FLORENCE_LEGENDS",
            cityId: "1",
            status: "IN_PROGRESS",
            progress: [
                {
                    activityType: "DISCOVER_MONUMENTS",
                    current: 2,
                    target: 3,
                    monumentIdsCompleted: ["201", "202"]
                }
            ],
            lastUpdated: "2025-08-11T12:00:00Z",
            GSI1PK: "MISSION#1",
            GSI1SK: `USER#${userId}`,
            GSI2PK: `USER#${userId}`,
            GSI2SK: "MISSION_STATUS#IN_PROGRESS"
        }
    ];
};

export const fetchUserAchievements = (userId: string): UserAchievement[] => {
    return [
        {
            PK: `USER#${userId}`,
            SK: "ACHIEVEMENT#DISCOVERER",
            entityType: "UserAchievement",
            userId,
            achievementId: "DISCOVERER",
            achievedAt: "2025-08-12T09:00:00Z",
            pointsEarned: 200,
            GSI1PK: "ACHIEVEMENT#DISCOVERER",
            GSI1SK: `USER#${userId}`
        }
    ];
};

export const fetchUserTrivials = (userId: string): UserTrivial[] => {
    return [
        {
            PK: `USER#${userId}`,
            SK: "TRIVIAL#1",
            entityType: "UserTrivial",
            userId,
            trivialId: "1",
            level: "medium",
            score: 8,
            completedAt: "2025-08-10T15:00:00Z",
            GSI1PK: `USER#${userId}`,
            GSI1SK: "TRIVIAL_DATE#2025-08-10T15:00:00Z",
            GSI2PK: "TRIVIAL#1",
            GSI2SK: `USER#${userId}`
        }
    ];
};

// ================== STATS / SUMMARIES ==================

export const fetchMonumentsByCitySummary = (userId: string): MonumentsByCitySummary[] => {
    return [
        {
            PK: `USER#${userId}`,
            SK: "CITY_SUMMARY#1",
            cityId: "1",
            cityName: "Florence",
            monumentsCount: 5,
            recentMonuments: [
                {
                    monumentId: "201",
                    name: "Ponte Vecchio",
                    cityId: "1",
                    cityName: "Florence",
                    discoveredAt: "2025-08-10T10:00:00Z"
                },
                {
                    monumentId: "202",
                    name: "Santa Maria del Fiore",
                    cityId: "1",
                    cityName: "Florence",
                    discoveredAt: "2025-08-10T11:00:00Z"
                }
            ]
        }
    ];
};

export const fetchUserStatsSummary = (userId: string): UserStatsSummaryTable => {
    return {
        PK: `USER#${userId}`,
        SK: "STATS_SUMMARY",
        userId,
        totalPoints: 550,
        level: "Intermediate",
        totalPlayTimeMinutes: 240,
        lastActiveAt: "2025-08-12T12:00:00Z",
        monumentsCount: 5,
        missionsCount: 3,
        achievementsCount: 2,
        trivials: { total: 3, averageScore: 7.5 },
        recentAchievements: [
            {
                achievementId: "DISCOVERER",
                title: "Master Discoverer",
                description: "Complete all missions in Florence.",
                achievedAt: "2025-08-12T09:00:00Z"
            }
        ],
        recentMonuments: fetchMonumentsByCitySummary(userId),
        GSI1PK: "GLOBAL_RANKING",
        GSI1SK: "POINTS#550"
    };
};
