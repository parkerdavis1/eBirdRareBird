import { writable, derived } from "svelte/store";

export const isRadiusView = writable(false);

export const radius = writable({
    latLon: undefined,
    distance: 15,
    days: 3,
})

export const region = writable({
    days: 3,
    region: 'US-AZ-013',
})

export const filters = writable({
    hideUnconfirmed: false,
    sortType: 'taxonomic'
})

export const loading = writable(false);

export const allComments = writable({});