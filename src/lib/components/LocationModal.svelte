<script>
    import AltRegionForm from "$lib/components/AltRegionForm.svelte";
    import CloseButton from "$lib/components/CloseButton.svelte";
    import { fade } from "svelte/transition";
    export let regionData
    export let searchInput

</script>

<div class="absolute 
            top-full pt-5 w-full
            dark:bg-slate-700 dark:text-white
            bg-slate-100 text-slate-900

            border border-1 border-black" transition:fade>
    <div class="max-w-4xl mx-auto p-4">
        <h2 class="font-bold mb-4">County</h2>
        <div class="max-w-md">
            <AltRegionForm 
                regionData={regionData}
                searchInput={searchInput}
            />
        </div>
    </div>

    <CloseButton on:close />

</div>
