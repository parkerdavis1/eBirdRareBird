<script>
    import BirdObservation from "./BirdObservation.svelte";
    import { filters } from "../store";

    export let groupName;
    export let groupedBirdData;
    export let showAll;

    function getSpeciesData(obj) {
        return obj[groupName];
    }

    $: obsOfSpecies = getSpeciesData(groupedBirdData)

</script>

<details bind:open={showAll} class="transition-[margin] duration-200 ease-out open:mb-8">
    <summary class="cursor-pointer my-2"><span>{groupName}</span></summary>
    {#each obsOfSpecies as bird (bird.obsId)}
        <BirdObservation 
            bird={bird}
        />
    {/each}
    <hr>
</details>