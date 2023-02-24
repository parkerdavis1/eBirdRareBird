<script>
    export let birdData

    import BirdObservation from '$lib/components/BirdObservation.svelte';
    import GroupName from '$lib/components/GroupName.svelte';
    import { page } from '$app/stores';
    import { loading, filters, isRadiusView } from '$lib/store'
    import taxonomy from '$lib/utils/taxonomy.json'
    import SortBar from '$lib/components/SortBar.svelte';

    let filteredData
    let groupedBirdData
    let groupList

    $: if (birdData) {
        $loading = false
        filteredData = filterObservations(birdData);
        groupedBirdData = groupBy(filteredData, $filters.sortType);
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

    function filterObservations(array) {
        let obsIds = [];
        let obsArr = [];
        array.forEach(birdObs => {
            // filter unconfirmed sightings
            if ($filters.hideUnconfirmed && !birdObs.obsValid) return;
            // filter media sightings
            if ($filters.onlyRichMedia && !birdObs.hasRichMedia) return;
            // remove duplicate sightings
            if (!obsIds.includes(birdObs.obsId)) {
                obsIds.push(birdObs.obsId);
                obsArr.push(birdObs);
            }
        });
        return obsArr;
    }

    function groupBy (array, sortType) {
        let groupedObj = {};
        array.forEach(birdObs => {
            let groupId;
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

    let showAll;
    
    function handleShowAllChange(event) {
        showAll = event.detail.showAll;
    }
</script>

<SortBar
    on:showAllChange={handleShowAllChange}
></SortBar>

{#if $loading}
    <p class="animate-pulse">Loading...</p>
{:else if $page.error}
    <p>{$page.status}: {$page.error.message}</p>
{:else if filteredData?.length < 1}
    <p>No results</p>
{:else}
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
{/if}
