<script>
    import { isRadiusView, filters, region } from "../store";
    import CloseButton from "./CloseButton.svelte";

    let slider;
</script>

<div class="absolute top-full
            w-full pt-5
            dark:bg-slate-700 dark:text-white bg-slate-100 text-slate-900 border border-1 border-black shadow-lg
            ">
    <div class="max-w-4xl mx-auto p-4 flex flex-col gap-4 justify-start flex-wrap">
        <h2 class="font-bold mb-4">Filters</h2>
        <form method="POST" id="region" action="?/region" class="flex flex-col flex-wrap align-center" bind:this={slider}>
            <input type="hidden" name="regionId" bind:value={$region.region}>
            <label for="days">Time period (days ago): {$region.days}</label>
            <input class="max-w-md" type="range" name="days" id="days" min="1" max="30" bind:value={$region.days} on:change={()=> slider.submit()}>
        </form>
        <div class="whitespace-nowrap">
            <input type="checkbox" id="hideUnconfirmed" bind:checked={$filters.hideUnconfirmed.value}>
            <label for="hideUnconfirmed">Hide Unconfirmed</label>
        </div>
        <div class:hidden={$isRadiusView} class="whitespace-nowrap">
            <input type="checkbox" id="onlyRichMedia" bind:checked={$filters.onlyRichMedia.value}>
            <label for="onlyRichMedia">Media Only</label>
        </div>
    </div>
    <CloseButton on:close />

</div>