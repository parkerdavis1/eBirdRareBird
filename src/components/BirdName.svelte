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

<div>
    <details bind:open={showAll}>
        <summary><span>{birdName}</span></summary>
        {#each obsOfSpecies as bird}
            <hr>
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
</div>


<style>
    span {
        font-size: 1.1rem;
    }

    details {
        padding-top: 0.5rem;
    }

    
</style>