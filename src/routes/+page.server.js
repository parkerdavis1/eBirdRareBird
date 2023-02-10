import { EBIRD_API } from '$env/static/private';

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
        try {
            const res = await fetch(`https://api.ebird.org/v2/product/checklist/view/${checklistId}`, requestOptions)

            const resJson = await res.json()
            const obsArr = resJson.obs;
    
            const specificObs = obsArr.find(obs => obs.obsId === obsId);
    
            let comments = specificObs.comments;
            // console.log(comments);
            const returnObject = {};
            returnObject[obsId] = comments;
            // console.log('RETURN OBJECT!!!!!', returnObject)

            return returnObject;

        } catch (err){
            console.log(err);
        }

    }
}