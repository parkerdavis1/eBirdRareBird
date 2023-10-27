import { redirect } from '@sveltejs/kit';
import makeFetchCookie from 'fetch-cookie';
const fetchCookie = makeFetchCookie(fetch);

export const regionSearch = async ({ request }) => {
    const data = await request.formData();
    let query = data.get('regionSearch');
    try {
        const res = await fetchCookie(`https://api.ebird.org/v2/ref/region/find?key=jfekjedvescr&q=${query}`);
        const resJson = await res.json();
        const regex = /.+-.+-.+/;
        const onlyCounties = resJson.filter(result => regex.test(result.code));
        return {
            searchInput: query,
            regionResults: onlyCounties
        }

    } catch (err){
        console.log(err);
    }
}

export const region = async({ request }) => {
    const data = await request.formData();
    const regionId = data.get('regionId');
    const days = data.get('days')
    const pathname = `/${regionId}?days=${days}`
    throw redirect(303, pathname)
}