<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    import AltRegionForm from "./AltRegionForm.svelte";
    import CloseButton from "./CloseButton.svelte";
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
        <h2 class="font-bold mb-4">Region</h2>

        <AltRegionForm 
            regionData={regionData}
            searchInput={searchInput}
        />
    </div>
    <!-- <div class="w-full flex justify-center mt-10">
        <button class="bg-sky-700 px-2 py-1 rounded text-white" on:click={()=> dispatch('close')}>Done</button>
    </div> -->
    <CloseButton on:close />

</div>
