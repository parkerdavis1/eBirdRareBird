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
  
        <span>{groupName}</span> 
        <!-- <span class="circle-badge inline-block text-xs bg-sky-300/20 rounded-full px-2 py-[0.1rem] mx-1">{obsOfSpecies.length}</span> -->
  
    </summary>
    {#each obsOfSpecies as bird (bird.obsId)}
        <BirdObservation 
            bird={bird}
        />
    {/each}
    <hr>
</details>