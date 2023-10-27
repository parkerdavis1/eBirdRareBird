import { EBIRD_API } from '$env/static/private';
import { regionSearch, region } from '$lib/utils/regionSearch';
import { filters } from '$lib/store';
import { get } from 'svelte/store'

import makeFetchCookie from 'fetch-cookie';
const fetchCookie = makeFetchCookie(fetch);

const myHeaders = new Headers();
myHeaders.append("X-eBirdApiToken", EBIRD_API);

const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

export const actions = {
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
            return returnObject;

        } catch (err){
            console.log(err);
        }
    },
    regionSearch: regionSearch,
    region: region
}

export async function load({ params, url }) {
    let days;
    if (url.searchParams.get('days') !== null) { //if there are searchParams, use them
        days = daysLimiter(url.searchParams.get('days')); //daysLimiter limits queryParam to 1-30
    } else { 
        days = get(filters).days; // else use the filters.days default
    }

    const fetchBirdData = async () => {
        const queries = `?detail=full&back=${days}`
        const res = await fetch(`https://api.ebird.org/v2/data/obs/${params.location}/recent/notable${queries}`, requestOptions);
        const resJson = await res.json();
        console.log("FETCHED BIRD DATA")
        const filteredData = filterObservations(resJson);
        return filteredData;
    }
    const fetchLocationName = async () => {
        const res = await fetch(`https://api.ebird.org/v2/ref/region/info/${params.location}?regionNameFormat=detailednoqual`, requestOptions);
        const resJson = await res.json();
        return resJson.result;
    }

    return {
        days: days,
        location: fetchLocationName(),
        birdObs: fetchBirdData()
    }
}


// Helper functions

// GET COMMENTS
async function getComments({ checklistId, obsId }) {
    const res = await fetch(`https://api.ebird.org/v2/product/checklist/view/${checklistId}`, requestOptions)
    const resJson = await res.json()
    const specificObs = resJson.obs.find(obs => obs.obsId === obsId);

    let comments = specificObs.comments;
    if (!comments) {
        return "No details"
    }
    return comments
}

// GET MEDIA
async function getMedia(obsId) {
    const res = await fetchCookie(`https://ebird.org/obsservice/media?obsId=${obsId}`, {
        method: 'GET',
        redirect: 'follow'
    })
    const resJson = await res.json()
    const catIds = getArrayOfAssets(resJson);
    const catIdsString = catIds.toString();
    const mlRes = await fetchCookie(`https://search.macaulaylibrary.org/api/v1/search?includeUnconfirmed=T&sort=id_asc&catId=${catIdsString}`);
    const mlResJson = await mlRes.json();
    const resArr = await mlResJson.results.content;
    return resArr;
}

// GET ARRAY OF ASSETS
function getArrayOfAssets(arr) {
    return arr.map(x => x.assetId)
}

// FILTER DUPLICATE OBSERVATIONS
function filterObservations(array) {
    let obsIds = [];
    let obsArr = [];

    array.forEach(birdObs => {
        if (!obsIds.includes(birdObs.obsId)) {
            obsIds.push(birdObs.obsId);
            obsArr.push(birdObs);
        }
    });
    return obsArr;
}

// Make sure query param days is between 1-30
function daysLimiter(number) {
    let trueNum;
    if (!isNaN(Number.parseInt(number))) { // if parsed input IS a number, assign it to trueNum
        trueNum = Number.parseInt(number)
    } else { // if parsed input is NOT a number, give it 7 as a default
        trueNum = 7; // default
    }
    if (trueNum > 30) { // if greater than 30, reduce to 30
        return 30;
    } else if (trueNum < 1) { // if less than 1 make it 1
        return 1
    } else return trueNum
}

// check queryParams for filters and validate
function checkBooleanQuery(key, url) {
    const value = url.searchParams.get(key)?.toLowerCase();
    const valueBool = value === 'true';
    let returnValue;
    if (value !== null && value) { 
        returnValue = valueBool; // if input is valid boolean, return that value
    } else {
        returnValue = get(filters)[key].value; // else return the stored boolean
    }
    return returnValue;
}

