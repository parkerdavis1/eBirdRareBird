<script>
    export let birdData
    export let showAll

    import GroupName from "./GroupName.svelte";
    import BirdObservation from "./BirdObservation.svelte";

    import { filters } from '../store'

    let groupedBirdData
    let groupList

    $: if (birdData) {
        groupedBirdData = groupBy(birdData, $filters.sortType, $filters.hideUnconfirmed);
        groupList = Object.keys(groupedBirdData).sort()
        // console.log('groupList', groupList)
        // console.log('groupedBirdData', groupedBirdData);
    }

    function groupBy (array, sortType, hideUnconfirmed) {
        let groupedObj = {};
        array.forEach(birdObs => {
            let groupId;
            if (hideUnconfirmed && !birdObs.obsValid) return;
            if (sortType === 'species') {
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
        {#each birdData as bird}
            <BirdObservation 
                bird={bird}
            />
        {/each}
    {:else}
        {#each groupList as groupName}
            <GroupName 
                groupedBirdData={groupedBirdData}
                groupName={groupName}
                showAll={showAll}
            />
        {/each}
    {/if}
{/if}