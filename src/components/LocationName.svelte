<script>
    // import BirdResult from "./BirdResult.svelte";
    import BirdObservation from "./BirdObservation.svelte";


    export let locationName;
    export let birdData;
    export let showAll;
    export let allComments;


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

    function getAndSortObsFromLocation(obj, birdSort = false) {
        let observations = obj[locationName];
        if (!birdSort) {
            return observations;
        }
        let obsArr = turnObjIntoArray(createSpeciesObj(observations));
        return obsArr;
    }


    const obsOfLocation = getAndSortObsFromLocation(birdData);
</script>


<div>
    <details bind:open={showAll}>
        <summary><span>{locationName}</span></summary>
            {#each obsOfLocation as observation (observation.obsId)}
                <BirdObservation 
                    bird={observation}
                    sortType="location"
                    allComments={allComments}
                />
            {/each}
    </details>
</div>
