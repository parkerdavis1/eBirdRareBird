<script>
    import BirdResult from "./BirdResult.svelte";

    export let locationName;
    export let birdData;
    export let showAll

    function createSpeciesObj(array) {
        let sortedObj = {};
        array.forEach(obs => {
            let birdName = obs.comName;
            if (!Object.keys(sortedObj).includes(birdName)) {
                sortedObj[birdName] = [obs];
            } else {
                sortedObj[birdName].push(obs);
            }
        })
        return sortedObj;
    }

    function turnObjIntoArray(obj) {
        let sortedArray = [];
        const listOfSpecies = Object.keys(obj);
        listOfSpecies.forEach(species => {
            sortedArray.push(obj[species])
        })
        return sortedArray.flat();
    }

    function getAndSortObsFromLocation(obj) {
        let observations = obj[locationName];
        let obsArr = turnObjIntoArray(createSpeciesObj(observations));
        return obsArr;
    }


    const obsOfLocation = getAndSortObsFromLocation(birdData);
</script>


<div>
    <details bind:open={showAll}>
        <summary><span>{locationName}</span></summary>
        <table role="grid">
            <tbody>
                {#each obsOfLocation as observation}
                    <tr>
                    <BirdResult 
                        bird={observation}
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