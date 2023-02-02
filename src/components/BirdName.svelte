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

    const obsOfSpecies = getSpeciesData(birdData);
</script>

<details bind:open={showAll} class="my-2">
    <summary class="cursor-pointer"><span>{birdName}</span></summary>
    {#each obsOfSpecies as bird}
        <BirdObservation 
            bird={bird}
            sortType="bird"
            allComments={allComments}
        />
    {/each}

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