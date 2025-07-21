import {fetch} from "expo/fetch";

const colors = ["#8ac926", "#1982c4", "#ff595e", "#ffca3a",]

export function findColorByItem(item) {
    if(!item.registered) {
        return "rgb(147,147,147)";
    }
    switch(item.type) {
        case "grass":
            return colors[0];
            break
        case "water":
            return colors[1];
            break
        case "fire":
            return colors[2];
            break
        default:
            return colors[3];
    }
}

export function retrieveRealItemState(item) {
    if(item.registered) {
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