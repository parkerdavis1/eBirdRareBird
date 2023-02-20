import { EBIRD_API } from '$env/static/private';
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
            console.log('returnObject: ', returnObject)
            return returnObject;

        } catch (err){
            console.log(err);
        }
    }
}

export async function load({ params, url }) {
    // console.log('params!', params);
    console.log('url', url)
    const fetchBirdData = async () => {
        const days = daysLimiter(url.searchParams.get('days')) || 3; //daysLimiter limits queryParam to 1-30
        console.log('days used: ', days)
        const queries = `?detail=full&back=${days}`
        const res = await fetch(`https://api.ebird.org/v2/data/obs/${params.location}/recent/notable${queries}`, requestOptions);
        const resJson = await res.json();
        console.log('BIRD DATA, ', Array.isArray(resJson));
        const filteredData = filterObservations(resJson);
        return filteredData;
    }
    const fetchLocationName = async () => {
        const res = await fetch(`https://api.ebird.org/v2/ref/region/info/${params.location}`, requestOptions);
        const resJson = await res.json();
        return resJson.result;
    }

    return {
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
    // console.log('returnObject: ', returnObject)
    if (!comments) {
        // returnObject[obsId].comments = 'No details';
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

// GET ARRAY OF ASSETS
function getArrayOfAssets(arr) {
    return arr.map(x => x.assetId)
}

// FILTER DUPLICATE OBSERVATIONS
function filterObservations(array) {
    let obsIds = [];
    let obsArr = [];
    array.forEach(birdObs => {
        // filter unconfirmed sightings
        // if ($filters.hideUnconfirmed && !birdObs.obsValid) return;
        // filter media sightings
        // if ($filters.onlyRichMedia && !birdObs.hasRichMedia) return;
        // remove duplicate sightings
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
    if (typeof number !== 'number') {
        trueNum = Number.parseInt(number)
    }
    if (trueNum > 30) {
        return 30;
    } else if (trueNum < 1) {
        return 1
    } else return trueNum
}