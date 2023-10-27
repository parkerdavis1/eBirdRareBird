<script>
    import BirdObservation from "$lib/components/BirdObservation.svelte";

    export let groupName;
    export let groupedBirdData;
    export let showAll;

    function getSpeciesData(obj) {
        return obj[groupName];
    }

    $: obsOfSpecies = getSpeciesData(groupedBirdData)

</script>

<details bind:open={showAll} class="transition-[margin] duration-200 ease-out open:mb-8">
    <summary class="cursor-pointer my-2">
        <div class="inline">
            <span>{groupName}</span> 
            {#if !showAll}
                <span id="circle" class="relative bottom-[1px] opacity-80 circle-badge inline-block text-xs bg-sky-300/20 rounded-full px-2 mx-1">{obsOfSpecies.length}</span>
            {/if}
        </div>
    </summary>
    {#each obsOfSpecies as bird (bird.obsId)}
        <BirdObservation 
            bird={bird}
        />
    {/each}
    <hr>
</details>