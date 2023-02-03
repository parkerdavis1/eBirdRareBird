<script>
    import BirdObservation from "./BirdObservation.svelte";
    import BirdResult from "./BirdResult.svelte";

    export let birdName;
    export let birdData;
    export let showAll
    export let allComments;

    function getSpeciesData(obj) {
        return obj[birdName];
    }

    $: obsOfSpecies = getSpeciesData(birdData);
</script>

<details bind:open={showAll}>
    <summary class="cursor-pointer my-2"><span>{birdName}</span></summary>
    {#each obsOfSpecies as bird (bird.obsId)}
        <BirdObservation 
            bird={bird}
            sortType="bird"
            allComments={allComments}
        />
    {/each}
    <hr>

    <!-- <table role="grid">
        <tbody>
            {#each obsOfSpecies as bird, id}
                <BirdResult 
                    bird={bird}
                    sortType="bird"
                    
                    allComments={allComments}
                />
            {/each}
        </tbody>
    </table> -->

</details>