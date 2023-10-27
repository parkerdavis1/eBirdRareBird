import { writable} from "svelte/store";
import { browser } from '$app/environment';

export const loading = writable(false);

export const allComments = writable({});


let regionDefault = { days: 7, region: 'US-AZ-013'}
export const region = writable(browser ? JSON.parse(sessionStorage.getItem('regionFormInputs')) || regionDefault : regionDefault)
region.subscribe(value => {
    if (browser) {
        sessionStorage.regionFormInputs = JSON.stringify(value)
    }
});

let filtersDefault = {
    hideUnconfirmed: { value: false, label: "Hide Unconfirmed" },
    sortType: 'taxonomic',
    onlyRichMedia: { value: false, label: "Media" },
    days: 7
}


export const filters = writable(browser ? JSON.parse(sessionStorage.getItem('filters')) || filtersDefault : filtersDefault)
filters.subscribe(value => {
    if (browser) {
        sessionStorage.filters = JSON.stringify(value)
    }
})