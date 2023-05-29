import { EBIRD_API } from '$env/static/private';

import makeFetchCookie from 'fetch-cookie';
const fetchCookie = makeFetchCookie(fetch);

var myHeaders = new Headers();
myHeaders.append("X-eBirdApiToken", EBIRD_API);

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};


// latLon Parser 
const parseLatLon = (latLonString) => {
    const parenRemoveRegex = /(\(|\))/g;
    const latLonNoParen = latLonString.replace(parenRemoveRegex, '');
    let commaIndex = latLonNoParen.indexOf(',');
    let lat = latLonNoParen.slice(0, commaIndex).trim();
    let lon = latLonNoParen.slice(commaIndex + 1).trim();
    return { lat, lon };
}

export const actions = {
    radius: async ({ request }) => {
        const data = await request.formData();
        const latLon = data.get('location');
        // console.log('latLonData', latLonData);
        const location = parseLatLon(latLon);
        // console.log('location obj', location);
        const days = data.get('days');
        const distance = data.get('distance');
        try {
            let detail = 'full'; // simple/full
            let hotspot = false; 
            let maxResults = undefined; // 1-10000, undefined returns all
            const queries = `back=${days}&detail=${detail}&hotspot=${hotspot}&dist=${distance}${maxResults ? `&maxResults=${maxResults}`: ''}`
            const res = await fetch(`https://api.ebird.org/v2/data/obs/geo/recent/notable?lat=${location.lat}&lng=${location.lon}&${queries}`, requestOptions);
            const resJson = await res.json();
            // console.log(resJson);
            return { 
                radius: resJson,
            };

        } catch (err) {
            console.log(err);
        }
    },
    
    region: async ({ request }) => {
        const data = await request.formData();
        const region = data.get('region');
        const days = data.get('days');
        const queries = `?detail=full&back=${days}`
        try {
            const res = await fetch(`https://api.ebird.org/v2/data/obs/${region}/recent/notable${queries}`, requestOptions);
            // throw errors
            // const res = await fetch(`https://api.ebird.org/v2/data/obs/${region}/recent/notable${queries}`);
            const resJson = await res.json();
            return {
                region: resJson
            }

        } catch (err) {
            console.log(err);
        }
    },

    getComments: async ({ request }) => {
        const data = await request.formData();
        const checklistId = data.get('checklistId');
        const obsId = data.get('obsId');
        const hasRichMedia = data.get('hasRichMedia');

        let returnObject = {};
        returnObject[obsId] = {};

        try {
            if (hasRichMedia === 'true') {
                let [comments, mediaArr] = await Promise.allSettled([
                    getComments({ checklistId, obsId }),
                    getMedia(obsId)
                ])
                returnObject[obsId].comments = comments.value;
                returnObject[obsId].media = mediaArr.value;
            } else {
                let comments = await getComments({ checklistId, obsId });
                returnObject[obsId].comments = comments;
            }
            console.log('returnObject: ', returnObject)
            return returnObject;

        } catch (err){
            console.log(err);
        }
    },

    regionSearch: async ({ request }) => {
        const data = await request.formData();
        const query = data.get('regionSearch');
        try {
            const res = await fetchCookie(`https://api.ebird.org/v2/ref/region/find?key=jfekjedvescr&q=${query}`);
            const resJson = await res.json();
            // console.log('region search result', resJson);
            return {
                regionResults: resJson
            }

        } catch (err){
            console.log(err);
        }
    }
}


async function getComments({ checklistId, obsId }) {
    const res = await fetch(`https://api.ebird.org/v2/product/checklist/view/${checklistId}`, requestOptions)
    const resJson = await res.json()
    const specificObs = resJson.obs.find(obs => obs.obsId === obsId);

    let comments = specificObs.comments;
    // console.log('returnObject: ', returnObject)
    if (!comments) {
        // returnObject[obsId].comments = 'No details';
        return "No details"
    }
    return comments
}


async function getMedia(obsId) {
    const res = await fetchCookie(`https://ebird.org/obsservice/media?obsId=${obsId}`, {
        method: 'GET',
        redirect: 'follow'
    })
    const resJson = await res.json()
    // console.log('photo: ', resJson)
    const catIds = getArrayOfAssets(resJson);
    // console.log('catIds array: ', catIds);
    const catIdsString = catIds.toString();
    // console.log('catIds string', catIdsString);
    const mlRes = await fetchCookie(`https://search.macaulaylibrary.org/api/v1/search?includeUnconfirmed=T&sort=id_asc&catId=${catIdsString}`);
    const mlResJson = await mlRes.json();
    // console.log('mlResJson', mlResJson);
    const resArr = await mlResJson.results.content;
    // console.log('search response array', resArr);
    return resArr;
}

function getArrayOfAssets(arr) {
    return arr.map(x => x.assetId)
}