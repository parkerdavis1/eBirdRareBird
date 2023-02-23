<script>
    import { fade, fly, slide, scale, draw } from "svelte/transition";
    import { quintOut } from 'svelte/easing';

    import BirdObservation from "../../../components/BirdObservation.svelte";
    import SortBar from "../../../components/SortBar.svelte";
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

    $: searchInput = form?.searchInput

    let regionData;
    $: if (form?.regionResults) {
        console.log('form dot regionresults', form.regionResults)
        regionData = form.regionResults
    }

    let birdData = data.birdObs  

    let filteredData;
    $: {
        console.log('changing bird data now!')
        $loading = false
        filteredData = filterObservations(birdData);
        groupedBirdData = groupBy(filteredData, $filters.sortType);
        if ($filters.sortType !== 'taxonomic') {
            groupList = Object.keys(groupedBirdData).sort()
        } else {
            groupList = Object.keys(groupedBirdData).sort(taxonomySort)
        }
    }

    function filterObservations(array) {
        let obsIds = [];
        let obsArr = [];
        array.forEach(birdObs => {
            // filter unconfirmed sightings
            if ($filters.hideUnconfirmed.value && !birdObs.obsValid) return;
            // filter media sightings
            if ($filters.onlyRichMedia.value && !birdObs.hasRichMedia) return;
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
<div class="dark:bg-slate-700 dark:text-slate-50  bg-slate-800 text-slate-50 text-sm">
    <div class="container mx-auto max-w-5xl
                px-4 py-5
                flex gap-8 h-10 min-h-max items-center 
                bg-inherit text-inherit">
        <p class="font-extralight">Filter:</p>
        <button class="flex items-center gap-1 text-sky-300" on:click={() => locationModalDisplay = !locationModalDisplay}>
            <!-- <svg class="relative top-1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256">
                <path fill="currentColor" d="M130.3 224a96.3 96.3 0 0 0 83.9-53.6L159.9 137a7.2 7.2 0 0 0-3.1-1.1l-22.9-3.1a7.8 7.8 0 0 0-8.3 4.7l-13.7 30.7a8 8 0 0 0 1.4 8.7l18.8 20.3a8.2 8.2 0 0 1 2 7l-3.8 19.8ZM65 55.6l-9 21.2a8 8 0 0 0-.1 5.9l11.5 30.6a7.9 7.9 0 0 0 5.8 5.1l5.4 1.1l8.3-19.7a8.1 8.1 0 0 1 7.4-4.9h21.4a8.6 8.6 0 0 0 3.8-1l12.3-6.8a7.2 7.2 0 0 0 1.5-1.1l26.9-24.3a8.1 8.1 0 0 0 1.6-9.8l-9.3-16.8A98.5 98.5 0 0 0 128 32a95.4 95.4 0 0 0-63 23.6Z" opacity=".2"/>
                <path fill="currentColor" d="M221.6 173.3A102.9 102.9 0 0 0 232 128a104.2 104.2 0 0 0-77.2-100.5h-.5A103.8 103.8 0 0 0 60.4 49l-1.3 1.2A103.9 103.9 0 0 0 128 232h2.4a104.3 104.3 0 0 0 90.6-57.4ZM216 128a89.3 89.3 0 0 1-5.5 30.7l-46.4-28.5a15.4 15.4 0 0 0-6.3-2.3l-22.8-3a16.1 16.1 0 0 0-15.3 6.8h-8.6l-3.8-7.9a15.7 15.7 0 0 0-11-8.7l-6.6-1.4l4.6-10.8h21.4a16.1 16.1 0 0 0 7.7-2l12.2-6.8a16.1 16.1 0 0 0 3-2.1l26.9-24.4a15.7 15.7 0 0 0 4.5-16.9a88 88 0 0 1 46 77.3Zm-68.8-85.9l7.6 13.7l-26.9 24.3l-12.2 6.8H94.3a15.9 15.9 0 0 0-14.7 9.8l-5.3 12.4l-10.9-29.2l8.2-19.3a87.8 87.8 0 0 1 75.6-18.5ZM40 128a87.1 87.1 0 0 1 9.5-39.7l10.4 27.9a16.1 16.1 0 0 0 11.6 10l5.5 1.2h.1l15.8 3.4l3.8 7.9a16.4 16.4 0 0 0 14.4 9h1.2l-7.7 17.2a16.1 16.1 0 0 0 2.8 17.4l18.8 20.4l-2.5 13.2A88.1 88.1 0 0 1 40 128Zm100.1 87.2l1.8-9.5a16 16 0 0 0-3.9-13.9l-18.8-20.3l12.7-28.7h.1l.9-2.1l22.8 3.1l47.8 29.4a88.5 88.5 0 0 1-63.4 42Z"/>
            </svg> -->
            <svg xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" viewBox="0 0 256 256">
                <path fill="currentColor" d="M221.6 173.3A102.9 102.9 0 0 0 232 128a104.2 104.2 0 0 0-77.2-100.5h-.5A103.8 103.8 0 0 0 60.4 49l-1.3 1.2A103.9 103.9 0 0 0 128 232h2.4a104.3 104.3 0 0 0 90.6-57.4ZM216 128a89.3 89.3 0 0 1-5.5 30.7l-46.4-28.5a15.4 15.4 0 0 0-6.3-2.3l-22.8-3a16.1 16.1 0 0 0-15.3 6.8h-8.6l-3.8-7.9a16.2 16.2 0 0 0-11-8.7l-6.6-1.4l2.6-5.9a7.8 7.8 0 0 1 7.3-4.9h16.1a16.1 16.1 0 0 0 7.7-2l12.2-6.8a16.1 16.1 0 0 0 3-2.1l26.9-24.4a15.7 15.7 0 0 0 4.5-16.9a88 88 0 0 1 46 77.3Zm-176 0a87.1 87.1 0 0 1 9.5-39.7l10.4 27.9a16.1 16.1 0 0 0 11.6 10l5.5 1.2h.1l12 2.6a7.8 7.8 0 0 1 5.5 4.3l2.1 4.4a16.1 16.1 0 0 0 14.4 9h1.2l-7.7 17.2a16.1 16.1 0 0 0 2.8 17.4l16.1 17.4a8.3 8.3 0 0 1 2 6.9l-1.8 9.3A88.1 88.1 0 0 1 40 128Z"/>
            </svg>
            <span class="hidden sm:inline">Location</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <path fill="currentColor" d="m4.427 7.427l3.396 3.396a.25.25 0 0 0 .354 0l3.396-3.396A.25.25 0 0 0 11.396 7H4.604a.25.25 0 0 0-.177.427Z"/>
            </svg>
        </button>
        <button class="flex items-center gap-1 text-sky-300" on:click={()=> showFilterModal = true}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" viewBox="0 0 12 12"><path fill="currentColor" d="M1 2.75A.75.75 0 0 1 1.75 2h8.5a.75.75 0 0 1 0 1.5h-8.5A.75.75 0 0 1 1 2.75Zm2 3A.75.75 0 0 1 3.75 5h4.5a.75.75 0 0 1 0 1.5h-4.5A.75.75 0 0 1 3 5.75ZM5.25 8a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5h-1.5Z"/></svg>
            <span class="hidden sm:inline">Filters</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <path fill="currentColor" d="m4.427 7.427l3.396 3.396a.25.25 0 0 0 .354 0l3.396-3.396A.25.25 0 0 0 11.396 7H4.604a.25.25 0 0 0-.177.427Z"/>
            </svg>
        </button>
    </div>
    {#if locationModalDisplay}
        <div class="relative z-10" 
            transition:fly={{x:-200}}
            use:clickOutside on:outclick={handleLocationOutclick}
            >
            <LocationModal 
                on:close={handleLocationOutclick}
                regionData={regionData}
                searchInput={searchInput}
            />
        </div>
    {/if}
    {#if showFilterModal}
        <div class="relative z-10" 
            transition:fly={{x:200}}
            use:clickOutside on:outclick={handleFilterOutclick}
            > 
            <FilterModal
                on:close={handleFilterOutclick}
            ></FilterModal>
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
            <div>
                <h2>{data.location}</h2>
                <!-- <h3 class="text-xs">in the past {data.days} days</h3>  -->
            </div>
        </div>
    </div>

</div>

<div class="text-slate-800 dark:text-slate-100">
    <div class="container mx-auto max-w-5xl px-4">
        <SortBar />
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