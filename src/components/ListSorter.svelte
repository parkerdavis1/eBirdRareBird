<script>
    export let birdData
    export let showAll

    import GroupName from "./GroupName.svelte";
    import BirdObservation from "./BirdObservation.svelte";
    import { filters } from '../store'
    import taxonomy from '../taxonomy.json'

    let filteredData
    let groupedBirdData
    let groupList


    $: if (birdData) {
        filteredData = filterDuplicates(birdData);
        groupedBirdData = groupBy(birdData, $filters.sortType, $filters.hideUnconfirmed);
        if ($filters.sortType !== 'taxonomic') {
            groupList = Object.keys(groupedBirdData).sort()
        } else {
            groupList = Object.keys(groupedBirdData).sort(taxonomySort)
        }
        // console.log('groupList', groupList)
        // console.log('groupedBirdData', groupedBirdData);
    }

    function taxonomySort(a,b) {
        return taxonomy[a] - taxonomy[b];
    }

    function filterDuplicates(array) {
        let obsIds = [];
        let obsArr = [];
        array.forEach(birdObs => {
            if ($filters.hideUnconfirmed && !birdObs.obsValid) return;
            if (!obsIds.includes(birdObs.obsId)) {
                obsIds.push(birdObs.obsId);
                obsArr.push(birdObs);
            }
        });
        return obsArr;
    }

    function groupBy (array, sortType, hideUnconfirmed) {
        let groupedObj = {};
        array.forEach(birdObs => {
            let groupId;
            if (hideUnconfirmed && !birdObs.obsValid) return;
            if (sortType === 'alpha' || sortType === 'taxonomic') {
                groupId = birdObs.comName
            } else if (sortType === 'location') {
                groupId = birdObs.locName
            } 
            let existingObsIds = [];

            if (!Object.keys(groupedObj).includes(groupId)) {
                groupedObj[groupId] = [birdObs];
            } else {
                existingObsIds = groupedObj[groupId].map(obj => obj.obsId);
                if (!existingObsIds.includes(birdObs.obsId)) {
                    groupedObj[groupId].push(birdObs);
                }
            }
        })
        return groupedObj;
    }
</script>

{#if birdData}
    {#if $filters.sortType === 'date'}
        {#each filteredData as bird (bird.obsId)}
            <BirdObservation 
                bird={bird}
            />
        {/each}
    {:else}
        {#each groupList as groupName (groupName)}
            <GroupName 
                groupedBirdData={groupedBirdData}
                groupName={groupName}
                showAll={showAll}
            />
        {/each}
    {/if}
{/if}
