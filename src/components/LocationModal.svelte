<script>
    import AltRegionForm from "./AltRegionForm.svelte";
    import { fade } from "svelte/transition";
    export let regionData

</script>

<div class="absolute 
            top-full p-8 w-full
            dark:bg-slate-700 dark:text-white
            bg-slate-100 text-slate-900

            border border-1 border-black" transition:fade>
    <div class="max-w-4xl mx-auto">
        <AltRegionForm 
            regionData={regionData}
        />
    </div>
</div>
