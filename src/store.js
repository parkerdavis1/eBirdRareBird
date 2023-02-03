import { writable, derived } from "svelte/store";

export const days = writable(3);

export const loading = writable(false);