import { EBIRD_API } from '$env/static/private';

var myHeaders = new Headers();
myHeaders.append("X-eBirdApiToken", EBIRD_API);

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

let location = { lat: undefined, lon: undefined };

// latLon Parser 
const parseLatLon = (latLonString, locationObj) => {
    const parenRemoveRegex = /(\(|\))/g;
    const latLonNoParen = latLonString.replace(parenRemoveRegex, '');
    let commaIndex = latLonNoParen.indexOf(',');
    locationObj.lat = latLonNoParen.slice(0, commaIndex).trim();
    locationObj.lon = latLonNoParen.slice(commaIndex + 1).trim();
}


let birds;
let birdData;

function sortBirds (array) {
    let obj = {};
    array.forEach(birdObs => {

        const spCode = birdObs.comName;
        let existingObsIds = [];
        // If sortObject has current species, get all current obsIds
        if (obj[spCode]) {
            existingObsIds = obj[spCode].map(obj => obj.obsId);
        }

        if (!Object.keys(obj).includes(spCode)) {
            obj[spCode] = [birdObs];
        } else if (!existingObsIds.includes(birdObs.obsId)) {
            // if obsId is not included, push it
            obj[spCode].push(birdObs);
        }
    })
    return obj;
}

function getBirdList(array) {
    let arr = [];
    array.forEach(birdObs => {
        const comName = birdObs.comName;
        const speciesCode = birdObs.speciesCode;
        if (!arr.includes(comName)) {
            arr.push(comName);
        }
    })
    return arr.sort();
}

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const latLonData = data.get('location');
        // console.log('latLonData', latLonData);
        parseLatLon(latLonData, location);
        // console.log('location obj', location);
        try {
            let back = 14; // 1-30
            let detail = 'full'; // simple/full
            let hotspot = false; 
            let maxResults = undefined; // 1-10000, undefined returns all
            let dist = 50; // 1-50
            const queries = `back=${back}&detail=${detail}&hotspot=${hotspot}&dist=${dist}${maxResults ? `&maxResults=${maxResults}`: ''}`
            const res = await fetch(`https://api.ebird.org/v2/data/obs/geo/recent/notable?lat=${location.lat}&lng=${location.lon}&${queries}`, requestOptions);
            const resJson = await res.json();
            birds = getBirdList(resJson);
            birdData = sortBirds(resJson);
            // console.log('\n\n-----BIRD DATA-----\n\n', birdData, '\n\n');

        } catch (err) {
            console.log(err)
        }
    }
}

export function load() {
    return {
        birds: birds,
        birdData: birdData
    }
}