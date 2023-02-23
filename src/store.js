import { writable} from "svelte/store";
import { browser } from '$app/environment';

export const loading = writable(false);

export const allComments = writable({});

export const isRadiusView = writable(browser ? JSON.parse(localStorage.getItem('isRadiusView')) || false : false);
isRadiusView.subscribe(value => {
    if (browser) {
        localStorage.isRadiusView = JSON.stringify(value);
    }
})

export const latLon = writable(browser ? JSON.parse(sessionStorage.getItem("latLon")) || '' : '');
latLon.subscribe( value => {
    if (browser) {
        sessionStorage.latLon = JSON.stringify(value);
    }
})

let radiusDefault = {latLon: undefined, distance: 20, days: 7}
export const radius = writable(browser ? JSON.parse(localStorage.getItem('radiusFormInputs')) || radiusDefault : radiusDefault);
radius.subscribe(value => {
    if (browser) {
        localStorage.radiusFormInputs = JSON.stringify(value)
    }
});

let regionDefault = { days: 14, region: 'US-AZ-013'}
export const region = writable(browser ? JSON.parse(localStorage.getItem('regionFormInputs')) || regionDefault : regionDefault)
region.subscribe(value => {
    if (browser) {
        localStorage.regionFormInputs = JSON.stringify(value)
    }
});

let filtersDefault = {
    hideUnconfirmed: { value: false, label: "Hide Unconfirmed" },
    sortType: 'taxonomic',
    onlyRichMedia: { value: false, label: "Media" }
}
export const filters = writable(browser ? JSON.parse(sessionStorage.getItem('filters')) || filtersDefault : filtersDefault)
filters.subscribe(value => {
    if (browser) {
        sessionStorage.filters = JSON.stringify(value)
    }
})

// can't do this because opening one will open all if they are bound to its value
// export const showAll = writable(false);