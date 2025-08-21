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

export const fetchAllCities = (): City[] => {
    return [
        {
            PK: "CITY#1",
            SK: "METADATA",
            entityType: "City",
            cityId: "1",
            name: "Florence",
            country: "Italy",
            imageUrl: "https://example.com/florence.jpg",
            coords: { latitude: 43.7696, longitude: 11.2558 },
            description: "Florence, cuna del Renacimiento, es famosa por sus obras maestras artísticas y su impresionante arquitectura. Pasear por sus calles es descubrir siglos de historia en cada rincón.",
            GSI1PK: "COUNTRY#Italy",
            GSI1SK: "CITY#1",
        },
        {
            PK: "CITY#2",
            SK: "METADATA",
            entityType: "City",
            cityId: "2",
            name: "Granada",
            country: "Spain",
            imageUrl: "https://example.com/granada.jpg",
            coords: { latitude: 37.1773, longitude: -3.5986 },
            description: "Granada combina el legado árabe, judío y cristiano. La Alhambra y el Albaicín hacen de la ciudad un museo vivo de historia, cultura y misterio.",
            GSI1PK: "COUNTRY#Spain",
            GSI1SK: "CITY#2",
        },
    ];
};


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
  if (cityId !== "1") return [];

  return [
    {
      PK: "CITY#1",
      SK: "ROUTE#FLORENCE_LEGENDS",
      entityType: "Route",
      routeId: "FLORENCE_LEGENDS",
      cityId: "1",
      title: "Florencia de Leyendas",
      description:
        "Un viaje al lado más oscuro y enigmático de la ciudad. Historias de traiciones, pactos secretos y símbolos escondidos en sus monumentos.",
      theme: "Legends",
      difficulty: "Medium",
      estimatedDuration: "1h 30m",
      xpReward: 300,
      imageUrl: "https://cdn.miaplicacion.com/images/routes/florence_legends.jpg",
      monuments: ["PONTE_VECCHIO", "SANTA_MARIA_DEL_FIORE", "PALAZZO_VECCHIO"],
      GSI1PK: "ROUTE#FLORENCE_LEGENDS",
      GSI1SK: "CITY#1"
    },
    {
      PK: "CITY#1",
      SK: "ROUTE#FLORENCE_ART",
      entityType: "Route",
      routeId: "FLORENCE_ART",
      cityId: "1",
      title: "Florencia del Arte",
      description:
        "El Renacimiento en estado puro: descubre los lugares donde nacieron las obras maestras que cambiaron el mundo.",
      theme: "Art",
      difficulty: "Easy",
      estimatedDuration: "1h",
      xpReward: 200,
      imageUrl: "https://cdn.miaplicacion.com/images/routes/florence_art.jpg",
      monuments: ["SANTA_MARIA_DEL_FIORE", "PALAZZO_VECCHIO"],
      GSI1PK: "ROUTE#FLORENCE_ART",
      GSI1SK: "CITY#1"
    },
    {
      PK: "CITY#1",
      SK: "ROUTE#FLORENCE_POWER",
      entityType: "Route",
      routeId: "FLORENCE_POWER",
      cityId: "1",
      title: "El Poder de Florencia",
      description:
        "Sigue los pasos del poder político y económico que convirtió a Florencia en el corazón de Europa.",
      theme: "History",
      difficulty: "Hard",
      estimatedDuration: "2h",
      xpReward: 400,
      imageUrl: "https://cdn.miaplicacion.com/images/routes/florence_power.jpg",
      monuments: ["PALAZZO_VECCHIO", "PONTE_VECCHIO"],
      GSI1PK: "ROUTE#FLORENCE_POWER",
      GSI1SK: "CITY#1"
    }
  ];
};

export const fetchMonuments = (routeId: string): Monument[] => {
    if(routeId !== "FLORENCE_ART")
        return []

    return [
            {
                PK: "ROUTE#FLORENCE_LEGENDS",
                SK: "MONUMENT#PONTE_VECCHIO",
                entityType: "Monument",
                monumentId: "PONTE_VECCHIO",
                routeId: "FLORENCE_LEGENDS",
                cityId: "1",
                name: "Ponte Vecchio",
                description: "El puente más antiguo de Florencia, símbolo de la ciudad y hogar de orfebres y joyeros desde el siglo XVI. Su estructura medieval sobrevivió a guerras y desastres naturales.",
                coords: { latitude: 43.7678, longitude: 11.2532 } as LatLng,
                imageUrl: "https://example.com/images/ponte_vecchio.jpg",
                clue: "Busca el corredor superior: allí paseaban los Medici para cruzar la ciudad sin mezclarse con la multitud.",
                legend: "Se dice que los carniceros fueron expulsados del puente porque el olor a carne podrida incomodaba a la nobleza. Desde entonces, el oro sustituyó a la sangre.",
                trivia: "Durante la Segunda Guerra Mundial fue el único puente de Florencia que no destruyeron los nazis.",
                difficulty: "Easy",
                discoveryXP: 50,
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
                description: "La catedral de Florencia, con su icónica cúpula de Brunelleschi, fue un desafío arquitectónico que cambió la historia de la ingeniería.",
                coords: { latitude: 43.7731, longitude: 11.2560 } as LatLng,
                imageUrl: "https://example.com/images/santa_maria_del_fiore.jpg",
                clue: "Fíjate en el mosaico del sol dorado en la fachada, ahí empieza tu misión.",
                legend: "Cuenta la historia que Brunelleschi retó a los rivales a poner un huevo en pie. Al romper la base y hacerlo sostenerse, convenció al jurado de que también sabría 'romper las reglas' para levantar la cúpula.",
                trivia: "La cúpula sigue siendo la mayor del mundo construida en ladrillo.",
                difficulty: "Medium",
                discoveryXP: 100,
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
                description: "Antigua sede del poder en Florencia, fortaleza medieval que custodia secretos políticos y artísticos.",
                coords: { latitude: 43.7692, longitude: 11.2558 } as LatLng,
                imageUrl: "https://example.com/images/palazzo_vecchio.jpg",
                clue: "Busca la copia del David en la entrada, ese es tu punto de partida.",
                legend: "Las mazmorras bajo el palacio guardan las huellas de conspiraciones, juicios y traiciones que marcaron la historia de Florencia.",
                trivia: "El 'Salone dei Cinquecento' dentro del palacio inspiró a Dan Brown para su novela *Inferno*.",
                difficulty: "Hard",
                discoveryXP: 150,
                GSI1PK: "MONUMENT#PALAZZO_VECCHIO",
                GSI1SK: "CITY#1",
            },
        ];
};

export const fetchMonumentsByCity = (cityId: string): Monument[] => {
    if (cityId !== "1") return [];

    return [
        {
            PK: "ROUTE#FLORENCE_LEGENDS",
            SK: "MONUMENT#PONTE_VECCHIO",
            entityType: "Monument",
            monumentId: "PONTE_VECCHIO",
            routeId: "FLORENCE_LEGENDS",
            cityId: "1",
            name: "Ponte Vecchio",
            description: "El puente más antiguo de Florencia, famoso por sus joyerías suspendidas sobre el río Arno. Durante siglos, fue símbolo de prosperidad y centro de comercio.",
            coords: { latitude: 43.7678, longitude: 11.2532 } as LatLng,
            imageUrl: "https://example.com/images/ponte_vecchio.jpg",
            clue: "Busca los escaparates de joyas y escucha las historias de los orfebres.",
            legend: "Se dice que los Medici ordenaron cerrar el paso de carnicerías aquí porque el mal olor molestaba a la familia.",
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
            description: "La catedral de Florencia, con su icónica cúpula diseñada por Brunelleschi, es uno de los mayores logros arquitectónicos del Renacimiento.",
            coords: { latitude: 43.7731, longitude: 11.2560 } as LatLng,
            imageUrl: "https://example.com/images/santa_maria_del_fiore.jpg",
            clue: "Admira la cúpula desde la Piazza del Duomo, busca el sol dorado en el mosaico.",
            legend: "Se cuenta que Brunelleschi ganó el concurso para construir la cúpula gracias a su ingeniosa prueba del huevo.",
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
            description: "El ayuntamiento de Florencia, fortificado como un castillo medieval, fue sede del poder político de la ciudad durante siglos.",
            coords: { latitude: 43.7692, longitude: 11.2558 } as LatLng,
            imageUrl: "https://example.com/images/palazzo_vecchio.jpg",
            clue: "Encuentra la torre de Arnolfo y observa el David en la entrada.",
            legend: "Las mazmorras del Palazzo Vecchio fueron testigo de intrigas, traiciones y juicios de la Florencia renacentista.",
            GSI1PK: "MONUMENT#PALAZZO_VECCHIO",
            GSI1SK: "CITY#1",
        },
    ];
};


export const fetchCitiesVisitedByUser = (userId: string): City[] => {
    return [
        {
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
        },
        {
            PK: "CITY#2",
            SK: "METADATA",
            entityType: "City",
            cityId: "2",
            name: "Granada",
            country: "Spain",
            imageUrl: "https://example.com/granada.jpg",
            coords: { latitude: 37.1773, longitude: -3.5986 },
            GSI1PK: "COUNTRY#Spain",
            GSI1SK: "CITY#2"
        }
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
            description: "Find key monuments in Florence",
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
