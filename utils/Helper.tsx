import {fetch} from "expo/fetch";
import {
    Level,
    MissionType, Monument,
    MonumentDiscovery,
    MonumentsByCity,
    MonumentsResult,
    Place,
    PlayerStats,
    Target
} from "@/types/types";

const colors = ["#AD8A56", "#B4B4B4", "#AF9500", "#000000",]
export const colorPalette = ["#5d737e","#64b6ac","#c0fdfb","#daffef","#fcfffd"]

export const ITEM_TEMPLATE = {
    id: 0,
    name: "???",
    type: "???",
    difficulty: "???",
    image_url: "???",
    missionType: "???",
    clue: "???",
    place: {
        id: 0,
        coords: {
            latitude: 0,
            longitude: 0
        },
        name: ""
    },
    registered: false
}

export const findColorByLevel = (level: Level) => {
    switch (level.difficulty) {
        case "Basic":
            return colors[0];
        case "Medium":
            return colors[1];
        case "Hard":
            return colors[2];
        default:
            return colors[3];
    }
}

export function findColorByItem(target: Target) {
    if (!target?.registered) {
        return "#000";
    }

    switch (target?.difficulty) {
        case "Basic":
            return colors[0];
        case "Medium":
            return colors[1];
        case "Hard":
            return colors[2];
        default:
            return colors[3];
    }
}

export function fetchCitiesVisitedByUser(): Place[] {
    const places: Place[] = [
        {
            id: 0,
            name: "Granada",
            coords: {
                latitude: 0,
                longitude: 0
            }
        },
        {
            id: 1,
            name: "Sevilla",
            coords: {
                latitude: 0,
                longitude: 0
            }
        },
    ];

    return places;
}



export function fetchPlacesByCityVisitedByUser(): MonumentsResult {
    const monuments: MonumentDiscovery[] = [
        { monumentId: "m1", name: "Catedral de Sevilla", city: "Sevilla", dateDiscovered: "2025-08-13T10:00:00Z" },
        { monumentId: "m2", name: "Torre del Oro", city: "Sevilla", dateDiscovered: "2025-08-12T15:20:00Z" },
    ];

    return {
        count: monuments.length,
        monuments
    };
}

export function retrieveRealItemState(target: Target) {
    if (target.registered) {
        return target;
    }
    return {
        id: target.id,
        name: "???",
        type: "???",
        difficulty: "???",
        image_url: target.image_url,
        registered: target.registered
    }
}

export async function fetchData() {
    return fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
        .then(res => res.json())
        .then(async json => {
            const results = json.results;

            const promises = results.map(async (p: { url: string; }, index: any) => {
                const res = await fetch(p.url);
                const json = await res.json();

                return {
                    id: String(index),
                    name: json.name,
                    type: json.types[0].type.name,
                    difficulty: String(json.base_experience),
                    image_url: json.sprites.other["official-artwork"].front_default,
                    registered: Math.floor(Math.random() * 2) === 1
                };
            });
            return await Promise.all(promises);
        });
}


export const fetchTempData = (): Target[] => {
    let data: any[] = [];
    const allActivePlaces: Place[] = fetchAllActivePlaces()
    const allLevels: Level[] = fetchAllLevels()
    for (let i = 0; i < 10; i++) {
        let templateObject: Target =
            {
                id: 1,
                name: "Monument ",
                type: "Monument",
                difficulty: "Medium",
                place: {
                    coords: {
                        latitude: 0,
                        longitude: 0
                    },
                    name: "",
                    id: 0
                },
                missionType: "Aventurero",
                image_url: "https://www.svgrepo.com/show/104228/arc-de-triomphe.svg",
                registered: false,
                clue: ""
            }
        let placeIndex = Math.floor(Math.random() * 2)
        let registered = Math.floor(Math.random() * 2)
        let levelsIndex = Math.floor(Math.random() * 3)
        let missionTypeIndex = Math.floor(Math.random() * 4)
        templateObject.id = i;
        templateObject.name += `${i}`;
        templateObject.place.name = allActivePlaces[placeIndex].name;
        templateObject.difficulty = allLevels[levelsIndex].difficulty;
        templateObject.missionType = fetchMissionType()[missionTypeIndex].name;
        templateObject.place.coords = allActivePlaces[placeIndex].coords;
        templateObject.registered = registered === 0;

        data.push(templateObject)
    }

    return data;
}


export const fetchTempDataTargetsByZone = (zone: string): Target[] => {
    const targets: Target[] = fetchTempData()

    return targets.filter(t => t.place.name === zone)
}

export const fetchMissionType = (): MissionType[] => {

    return [
        {
            name: "visitante",
            id: 0
        },
        {
            name: "explorador",
            id: 1
        },
        {
            name: "coleccionista",
            id: 2
        },
        {
            name: "aventurero",
            id: 3
        }
    ]
}

export const fetchAllActivePlaces = (): Place[] => [
    {
        name: "Granada",
        coords: {
            latitude: 37.109673,
            longitude: -3.590427
        },
        id: 0
    },
    {
        name: "Florence",
        coords: {
            latitude: 43.7800127,
            longitude: 11.1997685
        },
        id: 1
    }
]

export const fetchAllLevels = (): Level[] => [
    {
        difficulty: "Basic", color: "Bronze",
        id: 0,
        targets: []
    },
    {
        difficulty: "Medium", color: "Silver",
        id: 1,
        targets: []
    },
    {
        difficulty: "Hard", color: "Gold",
        id: 2,
        targets: []
    },
];


export function fetchPlayerStats(): PlayerStats {
    return {
        totalPoints: 2450,
        progressToNextLevel: 0.67,
        monuments: {
            count: 5,
            list: [
                { id: "m1", name: "Catedral de Sevilla", city: "Sevilla", route: "Historic" },
                { id: "m2", name: "Alhambra", city: "Granada", route: "Historic" },
                { id: "m3", name: "Sagrada Familia", city: "Barcelona", route: "Modern" },
                { id: "m4", name: "Plaza Mayor", city: "Madrid", route: "Town Hall" },
                { id: "m5", name: "Torre del Oro", city: "Sevilla", route: "Historic" },
            ],
        },
        missions: {
            total: 3,
            list: [
                { id: "miss1", name: "Historic Sevilla", city: "Sevilla", route: "Historic", completedAt: "2025-08-01" },
                { id: "miss2", name: "Historic Granada", city: "Granada", route: "Historic", completedAt: "2025-08-05" },
                { id: "miss3", name: "Historic Barcelona", city: "Barcelona", route: "Historic", completedAt: "2025-08-08" },
            ],
        },
        achievements: [
            { id: "ach1", title: "Explorer", description: "Visit 10 monuments in a cuty", unlockedAt: "2025-08-05" },
            { id: "ach2", title: "Traveller", description: "Visitr monuments in 3 different cities", unlockedAt: "2025-08-08" },
        ],
        trivials: {
            total: 2,
            averageScore: 85,
            list: [
                { id: "t1", level: "medium", score: 80, completedAt: "2025-08-02" },
                { id: "t2", level: "hard", score: 90, completedAt: "2025-08-06" },
            ],
        },
        totalPlayTimeMinutes: 540,
    };
}

export function groupMonumentsByCity(monuments: Monument[]): MonumentsByCity[] {
    const map = new Map<string, Monument[]>();

    monuments.forEach(m => {
        if (!map.has(m.city)) {
            map.set(m.city, []);
        }
        map.get(m.city)!.push(m);
    });

    return Array.from(map.entries()).map(([city, monuments]) => ({
        city,
        monuments
    }));
}


