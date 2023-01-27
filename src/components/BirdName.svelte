<script>
    import BirdResult from "./BirdResult.svelte";

    export let birdName;
    export let birdData;
    export let showAll

    function getSpeciesData(obj) {
        return obj[birdName];
    }

    const obsOfSpecies = getSpeciesData(birdData);
</script>


<div>
    <details bind:open={showAll}>
        <summary><span>{birdName}</span></summary>
        <table role="grid">
            <tbody>
                {#each obsOfSpecies as bird, id}
                    <tr>
                    <BirdResult 
                        bird={bird}
                        id={id}
                    />
                    </tr>
                {/each}
            </tbody>
        </table>
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