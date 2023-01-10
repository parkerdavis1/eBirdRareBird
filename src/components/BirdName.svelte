<script>
    import BirdResult from "./BirdResult.svelte";

    export let birdName;
    export let birdData;

    function getSpeciesData(obj) {
        return obj[birdName];
    }

    const speciesArray = getSpeciesData(birdData);
</script>


<div>
    <details>
        <summary><span>{birdName}</span></summary>
        {#each speciesArray as bird, id}
            <BirdResult 
                bird={bird}
                id={id}
            />
        {/each}
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