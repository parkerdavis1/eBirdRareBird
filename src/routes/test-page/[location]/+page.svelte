<script>
    import { fade, fly, slide, scale, draw } from "svelte/transition";
    import { quintOut } from 'svelte/easing';

    import BirdObservation from "../../../components/BirdObservation.svelte";
    import FilterAndSortBar from "../../../components/FilterAndSortBar.svelte";
    import GroupName from "../../../components/GroupName.svelte";
    import LocationModal from "../../../components/LocationModal.svelte";
    import FilterModal from "../../../components/FilterModal.svelte";
    import { allComments, loading, filters } from '../../../store';
    import taxonomy from '../../../taxonomy.json'
    import { clickOutside } from "../../../utils/click-outside";

    export let data;
    export let form;

    let groupedBirdData;
    let groupList;
    let showAll;


    $: if (form) {
        for (const [key, value] of Object.entries(form)) {
            if (key !== 'region' && key !== 'radius') {
                $allComments[key] = value;
            }
        }
        // console.log($allComments);
        console.log('FORM', form)
    }

    let regionData;
    $: {
        console.log("Region data changing!...")
        regionData = form?.regionResults
        console.log('Region data from +page.svelte [location]', regionData)
    }

    $: birdData = data.birdObs

    let filteredData;
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

    function taxonomySort(a,b) {
        return taxonomy[a] - taxonomy[b];
    }

    let locationModalDisplay = false;
    let showFilterModal = false;

    function handleFilterOutclick() {
        setTimeout(()=> {
            if (showFilterModal == true) {
                showFilterModal = false;
            }
        })
    }

    function handleLocationOutclick() {
        setTimeout(() => {
            if (locationModalDisplay ==  true) {
                locationModalDisplay = false;
            }
        })
    }


</script>
<div class="dark:bg-slate-600 dark:text-slate-50 bg-slate-800 text-slate-50 text-sm">
    <div class="container mx-auto max-w-5xl
                px-4 py-5
                flex gap-4 h-10 min-h-max items-center 
                bg-inherit text-inherit">
        <button on:click={() => locationModalDisplay = !locationModalDisplay}>🌎 Location</button>
        <button class="flex gap-1" on:click={()=> showFilterModal = true}>
            <svg class="relative top-1"xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 2.4 24 24">
                <path fill="currentColor" d="M11 20.4q-.425 0-.713-.287T10 19.4q0-.425.288-.712T11 18.4h2q.425 0 .713.288T14 19.4q0 .425-.288.713T13 20.4h-2Zm-7-10q-.425 0-.713-.288T3 9.4q0-.425.288-.713T4 8.4h16q.425 0 .713.288T21 9.4q0 .425-.288.713T20 10.4H4Zm3 5q-.425 0-.713-.288T6 14.4q0-.425.288-.713T7 13.4h10q.425 0 .713.288T18 14.4q0 .425-.288.713T17 15.4H7Z"/>
            </svg>
            <span>Filters</span>
        </button>
    </div>
    {#if locationModalDisplay}
        <div class="relative z-10" 
            transition:fly={{x:-200}}
            use:clickOutside on:outclick={handleLocationOutclick}
            >
            <LocationModal 
                regionData={regionData}
            />
        </div>
    {/if}
    {#if showFilterModal}
        <div class="relative z-10" 
            transition:fly={{x:200}}
            use:clickOutside on:outclick={handleFilterOutclick}

            > 
            <FilterModal></FilterModal>
        </div>
    {/if}
</div>

<div class="dark:bg-slate-800 dark:text-slate-50 bg-slate-700 text-slate-50">
    <div class="container max-w-5xl
                px-4 py-12
                mx-auto flex flex-row justify-start items-center
                h-20
                ">
        <div class="flex items-baseline gap-x-4 flex-wrap">
            <h1 class="text-4xl font-bold">Rare Bird Alert</h1>
            <h2>{data.location}</h2>
        </div>
    </div>
</div>

<div class="text-slate-800 dark:text-slate-100">
    <div class="container mx-auto max-w-5xl px-4">
        <FilterAndSortBar />
    </div>

    <ul class="container mx-auto max-w-5xl p-4">

        {#if $loading}
            <p class="animate-pulse">Loading...</p>
        {:else if birdData?.length < 1}
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
                        />
                    {/each}
                {/if}
            {/if}
        {/if}
    </ul>
</div>