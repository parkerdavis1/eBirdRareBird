import { redirect } from '@sveltejs/kit'
import { regionSearch } from './regionSearch';

export async function load({ params }) {
    // console.log('params!', params);
}

export const actions = {
    regionSearch: regionSearch,

    region: async({ request, url }) => {
        const data = await request.formData();
        const regionId = data.get('regionId');
        const days = data.get('days')
        const pathname = `/test-page/${regionId}?days=${days}`
        throw redirect(303, pathname)
    }
}