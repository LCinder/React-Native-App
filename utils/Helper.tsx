import {
    City, CityObjectives, CompletedMission,
    Level,
    MissionType,
    Monument,
    MonumentDiscovery,
    MonumentsByCity,
    MonumentsResult,
    PlayerStats
} from "@/types/types";

const colors = ["#AD8A56", "#B4B4B4", "#AF9500", "#000000"];
export const colorPalette = ["#5d737e", "#64b6ac", "#c0fdfb", "#daffef", "#fcfffd"];

export const ITEM_TEMPLATE: Monument = {
    PK: "",
    SK: "",
    entityType: "Monument",
    monumentId: 0,
    name: "???",
    coords: {latitude: 0, longitude: 0},
    imageUrl: "",
    clue: "",
};

export const findColorByLevel = (level: Level) => {
    switch (level.difficulty) {
        case "basic": return colors[0];
        case "medium": return colors[1];
        case "hard": return colors[2];
        default: return colors[3];
    }
};

export function findColorByItem(monument: Monument) {
    if (!monument) return "#000";
    return colors[1];
}

export function fetchCitiesVisitedByUser(): City[] {
    return [
        {
            PK: "CITY#0",
            SK: "METADATA",
            entityType: "City",
            cityId: 0,
            name: "Granada",
            country: "Spain",
            imageUrl: "",
            coords: {latitude: 37.109673, longitude: -3.590427},
        },
        {
            PK: "CITY#1",
            SK: "METADATA",
            entityType: "City",
            cityId: 1,
            name: "Florence",
            country: "Italy",
            imageUrl: "",
            coords: {latitude: 43.7800127, longitude: 11.1997685},
        },
    ];
}

export function fetchPlacesByCityVisitedByUser(): MonumentsResult {
    const monuments: MonumentDiscovery[] = [
        {
            PK: "USER#u1",
            SK: "MONUMENT#m1",
            entityType: "UserMonument",
            userId: "u1",
            monumentId: 0,
            name: "Duomo",
            cityId: 1,
            routeId: "historic",
            discoveredAt: "2025-08-13T10:00:00Z",
            cityName: "Florence"
        },
        {
            PK: "USER#u1",
            SK: "MONUMENT#m2",
            entityType: "UserMonument",
            userId: "u1",
            monumentId: 2,
            name: "Palaccio",
            cityId: 1,
            routeId: "historic",
            discoveredAt: "2025-08-12T15:20:00Z",
            cityName: "Florence"
        },
        {
            PK: "USER#u1",
            SK: "MONUMENT#m3",
            entityType: "UserMonument",
            userId: "u1",
            monumentId: 0,
            name: "Alhambra",
            cityId: 0,
            routeId: "historic",
            discoveredAt: "2025-08-12T15:20:00Z",
            cityName: "Granada"
        },
    ];

    return { count: monuments.length, monuments };
}

export function retrieveRealItemState(monument: Monument) {
    return monument || ITEM_TEMPLATE;
}

export const fetchTempData = (): Monument[] => {
    const cities = fetchCitiesVisitedByUser();
    const missionTypes = fetchMissionType();
    const data: Monument[] = [];

    for (let i = 0; i < 10; i++) {
        const city = cities[i % cities.length];
        const missionType = missionTypes[i % missionTypes.length];
        data.push({
            PK: `${city.PK}#LEVEL#0#ROUTE#${missionType.routeId}`,
            SK: `MONUMENT#m${i}`,
            entityType: "Monument",
            monumentId: i,
            name: `Monument ${i}`,
            coords: city.coords,
            imageUrl: "https://www.svgrepo.com/show/104228/arc-de-triomphe.svg",
            clue: "",
            GSI3PK: city.PK,
            GSI3SK: `NAME#Monument ${i}`,
            cityId: city.cityId
        });
    }

    return data;
};

export const fetchTempDataMonumentsByZoneId = (zoneId: number): Monument[] => {
    return fetchTempData().filter(t => t.GSI3PK?.includes(`${zoneId}`));
};

export const fetchMissionType = (): MissionType[] => [
    {PK: "CITY#0#LEVEL#0", SK: "ROUTE#r0", entityType: "MissionType", routeId: "r0", name: "visitante"},
    {PK: "CITY#0#LEVEL#0", SK: "ROUTE#r1", entityType: "MissionType", routeId: "r1", name: "explorador"},
    {PK: "CITY#0#LEVEL#0", SK: "ROUTE#r2", entityType: "MissionType", routeId: "r2", name: "coleccionista"},
    {PK: "CITY#0#LEVEL#0", SK: "ROUTE#r3", entityType: "MissionType", routeId: "r3", name: "aventurero"}
];

export const fetchAllLevels = (): Level[] => [
    {PK: "CITY#granada", SK: "LEVEL#0", entityType: "Level", levelId: "0", cityId: "granada", difficulty: "basic", color: "Bronze"},
    {PK: "CITY#granada", SK: "LEVEL#1", entityType: "Level", levelId: "1", cityId: "granada", difficulty: "medium", color: "Silver"},
    {PK: "CITY#granada", SK: "LEVEL#2", entityType: "Level", levelId: "2", cityId: "granada", difficulty: "hard", color: "Gold"},
];

export function fetchPlayerStats(): PlayerStats {
    return {
        totalPoints: 2450,
        monuments: {
            count: 3,
            list: fetchPlacesByCityVisitedByUser().monuments
        },
        missions: {
            total: 3,
            list: [
                { missionId: "miss1", title: "Historic Florence 2", cityId: 1, routeId: "historic", completedAt: "2025-08-01" },
                { missionId: "miss2", title: "Historic Granada", cityId: 0, routeId: "historic", completedAt: "2025-08-05" },
                { missionId: "miss3", title: "Historic Florence", cityId: 1, routeId: "historic", completedAt: "2025-08-08" },
            ]
        },
        achievements: [
            {id: "ach1", name: "Explorer", description: "Visit 10 monuments in a city", unlockedAt: "2025-08-05"},
            {id: "ach2", name: "Traveller", description: "Visit monuments in 3 different cities", unlockedAt: "2025-08-08"},
        ],
        trivials: { total: 2, averageScore: 85 },
        totalPlayTimeMinutes: 540
    };
}

export function groupMonumentsByCity(monuments: MonumentDiscovery[]): MonumentsByCity[] {
    const cityMap = new Map<number, string>();
    const map = new Map<number, MonumentDiscovery[]>();

    monuments.forEach(m => {
        const cityId = m.cityId;
        if (!map.has(cityId)) {
            map.set(cityId, []);
            cityMap.set(cityId, m.cityName);
        }
        map.get(cityId)!.push(m);
    });

    return Array.from(map.entries()).map(([cityId, monuments]) => ({
        cityId,
        cityName: cityMap.get(cityId) || "Unknown",
        monuments
    }));
}

export const fetchAllActivePlaces = (): City[] => [
    { name: "Granada", coords: { latitude: 37.109673, longitude: -3.590427 }, cityId: 0, PK: "", SK: "", entityType: "City", country: "", imageUrl: "" },
    { name: "Florence", coords: { latitude: 43.7800127, longitude: 11.1997685 }, cityId: 1, PK: "", SK: "", entityType: "City", country: "", imageUrl: "" }
];

export function fetchCityObjectivesExample(): Map<number, CityObjectives> {
    const playerStats: PlayerStats = fetchPlayerStats();
    const cities = fetchCitiesVisitedByUser();
    const monumentsDiscovered: MonumentDiscovery[] = fetchPlacesByCityVisitedByUser().monuments;
    const missions: CompletedMission[] = playerStats.missions.list;
    const allMonuments: Monument[] = fetchTempData();

    const monumentsByCity: Record<number, MonumentDiscovery[]> = {};
    monumentsDiscovered.forEach(m => {
        if (!monumentsByCity[m.cityId]) monumentsByCity[m.cityId] = [];
        monumentsByCity[m.cityId].push(m);
    });

    const missionsByCity: Record<number, CompletedMission[]> = {};
    missions.forEach(m => {
        if (!missionsByCity[m.cityId]) missionsByCity[m.cityId] = [];
        missionsByCity[m.cityId].push(m);
    });

    const allMonumentsByCity: Record<number, Monument[]> = {};
    allMonuments.forEach(m => {
        const cityId = Number(m.GSI3PK?.split("#")[1] ?? -1);
        if (cityId < 0) return;
        if (!allMonumentsByCity[cityId]) allMonumentsByCity[cityId] = [];
        allMonumentsByCity[cityId].push(m);
    });

    const cityObjectivesMap = new Map<number, CityObjectives>();
    cities.forEach(city => {
        cityObjectivesMap.set(city.cityId, {
            cityId: city.cityId,
            cityName: city.name,
            monumentsDiscovered: monumentsByCity[city.cityId] || [],
            allMonuments: allMonumentsByCity[city.cityId] || [],
            missionsCompleted: missionsByCity[city.cityId] || [],
            trivials: []
        });
    });

    return cityObjectivesMap;
}
