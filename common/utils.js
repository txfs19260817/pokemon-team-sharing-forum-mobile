import {BattleMovedex} from "./data/moves"

const ApiUrl = "https://pokeshare.monster/api/v1/"
const IconsUrl = "https://pokeshare.monster/assets/pokemon-icons/"
const PmIconsUrl = "https://pokeshare.monster/assets/pokemon-icons/2d/"
const ItemIconsUrl = "https://pokeshare.monster/assets/pokemon-icons/items/"
const TypeIconsUrl = "https://pokeshare.monster/assets/pokemon-icons/types/"
const MovetypeIconsUrl = "https://pokeshare.monster/assets/pokemon-icons/movetypes/"
const UploadUrl = "https://pokeshare.monster/api/v1/upload"

/**
 * @return {string}
 */
export function DateConversion(timestamp) {
    let date = new Date(Date.parse(timestamp));
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y + M + D + h + m + s
}

export function ReconstructObject(obj) {
    let res = [];
    for (let [key, value] of Object.entries(obj)) {
        res.push({name: key, value: value})
    }
    return res
}

export function SortObjectArrayByValue(arr) {
    return arr.sort((a, b) => (b.value - a.value));
}

/**
 * @return {string}
 */
export function ProcessStr(s) {
    return s.replace(/[’-\s\[\].']/g, '').toLowerCase();
}

/**
 * @return {string}
 */
export function IconPath(name, category, ext = '.png') {
    name = ProcessStr(name);
    if (category === "pokemon") {
        return PmIconsUrl + name + ext
    }
    if (category === "items" || category === "item") {
        return ItemIconsUrl + name + ext
    }
    if (category === "movetypes" || category === "movetype") {
        name = BattleMovedex[name].type.toLowerCase();
        return TypeIconsUrl + name + ext
    }
    if (category === "types" || category === "type") {
        let lang = "eng";
        let filename = ["type", name, lang].join('-');
        return MovetypeIconsUrl + filename + ext
    }

    console.log("Error: category [" + category + "] is not valid! ")
}

/**
 * @return {string}
 */
export function IconPathHTML(name, category) {
    return `<img src="` + IconPath(name, category) + `" alt="` + name + `" title="`+ name + `" />`;
}