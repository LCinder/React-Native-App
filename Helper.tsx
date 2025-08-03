import {fetch} from "expo/fetch";

const colors = ["#AD8A56", "#B4B4B4", "#AF9500", "#000000",]
export const allActivePlaces = [{name: "Granada", latitude: "37.109673", longitude: "-3.590427"},
    {name: "Florence", latitude: "43.7800127", longitude: "11.1997685"}]


export const allLevels = [
    { difficulty: "Basic", color: "Bronze" },
    { difficulty: "Medium", color: "Silver" },
    { difficulty: "Hard", color: "Gold" },
];

export const findColorByLevel = (level) => {
    switch (level.difficulty) {
        case "Basic":
            return colors[0];
            break
        case "Medium":
            return colors[1];
            break
        case "Hard":
            return colors[2];
            break
        default:
            return colors[3];
    }
}

export function findColorByItem(item) {
    if (!item.registered) {
        return "rgb(0,0,0)";
    }

    switch (item.strange) {
        case "Basic":
            return colors[0];
            break
        case "Medium":
            return colors[1];
            break
        case "Hard":
            return colors[2];
            break
        default:
            return colors[3];
    }
}

export function retrieveRealItemState(item) {
    if (item.registered) {
        return item;
    }
    return {
        id: item.id,
        name: "???",
        type: "???",
        strange: "???",
        image_url: item.image_url,
        registered: item.registered
    }
}

export async function fetchData() {
    return fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
        .then(res => res.json())
        .then(async json => {
            const results = json.results;

            const promises = results.map(async (p, index) => {
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
            const allData = await Promise.all(promises);

            return allData;
        });
}


export const fetchTempData = () => {
    let data: any[] = [];
    for (let i = 0; i < 30; i++) {
        let templateObject =
            {
                id: "1",
                name: "Monument ",
                type: "Monument",
                place: "Florence",
                strange: "Medium",
                missionType: "Aventurero",
                latitude: "",
                longitude: "",
                image_url: "",
                registered: false
            }
        let placeIndex = Math.floor(Math.random() * 2)
        let registered = Math.floor(Math.random() * 2)
        let levelsIndex = Math.floor(Math.random() * 3)
        let missionTypeIndex = Math.floor(Math.random() * 4)
        templateObject.id = `${i}`;
        templateObject.name += i;
        templateObject.place = allActivePlaces[placeIndex].name;
        templateObject.strange = allLevels[levelsIndex].difficulty;
        templateObject.missionType = fetchMissionType()[missionTypeIndex].name;
        templateObject.latitude = allActivePlaces[placeIndex].latitude;
        templateObject.longitude = allActivePlaces[placeIndex].longitude;
        templateObject.registered = registered === 0;
        data.push(templateObject)
    }

    console.log(data[0])
    return data;
}

export const fetchMissionType = () => {

    return [
        {
            name: "visitante",
        },
        {
            name: "explorador",
        },
        {
            name: "coleccionista",
        },
        {
            name: "aventurero",
        }
    ]
}