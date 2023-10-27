<script>
    import { filters } from "$lib/store";
    import CloseButton from "$lib/components/CloseButton.svelte";
    import DaysPicker from "./DaysPicker.svelte";
</script>

<div class="absolute top-full
            w-full pt-5
            dark:bg-slate-700 dark:text-white bg-slate-100 text-slate-900 border border-1 border-black shadow-lg
            ">
    <div class="max-w-4xl mx-auto p-4 flex flex-col gap-4 justify-start flex-wrap">
        <h2 class="font-bold mb-4">Filters</h2>

        <DaysPicker />
        <div class="whitespace-nowrap">
            <input type="checkbox" id="hideUnconfirmed" bind:checked={$filters.hideUnconfirmed.value}>
            <label for="hideUnconfirmed">Hide Unconfirmed</label>
        </div>
        <div class="whitespace-nowrap">
            <input type="checkbox" id="onlyRichMedia" bind:checked={$filters.onlyRichMedia.value}>
            <label for="onlyRichMedia">Media Only</label>
        </div>
    </div>
    <CloseButton on:close />

</div>