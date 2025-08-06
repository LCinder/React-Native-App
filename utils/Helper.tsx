import {fetch} from "expo/fetch";
import {Level, MissionType, Place, Target} from "@/types/types";

const colors = ["#AD8A56", "#B4B4B4", "#AF9500", "#000000",]
export const colorPalette = ["#5d737e","#64b6ac","#c0fdfb","#daffef","#fcfffd"]

export const ITEM_TEMPLATE = {
    id: 0,
    name: "???",
    type: "???",
    strange: "???",
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

    switch (target?.strange) {
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

export function retrieveRealItemState(target: Target) {
    if (target.registered) {
        return target;
    }
    return {
        id: target.id,
        name: "???",
        type: "???",
        strange: "???",
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
                    strange: String(json.base_experience),
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
                strange: "Medium",
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
        templateObject.strange = allLevels[levelsIndex].difficulty;
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