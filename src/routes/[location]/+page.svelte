<script>
    import { fade, fly, slide, scale, draw } from "svelte/transition";
    import { quintOut } from 'svelte/easing';

    import BirdObservation from "$lib/components/BirdObservation.svelte";
    import SortBar from "$lib/components/SortBar.svelte";
    import GroupName from "$lib/components/GroupName.svelte";
    import LocationModal from "$lib/components/LocationModal.svelte";
    import FilterModal from "$lib/components/FilterModal.svelte";

    import { allComments, loading, filters, region } from '$lib/store';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { browser } from '$app/environment'; 

    import taxonomy from '$lib/utils/taxonomy.json'
    import { clickOutside } from "$lib/utils/click-outside";

    export let data;
    export let form;

    let groupedBirdData;
    let groupList;
    let showAll;

    $: { $filters.days = data.days }

    let sortTypes = ['taxonomic', 'alpha', 'location', 'date']
    $: if ($page.url.searchParams.get('sortType') !== null) { // if there are sortType query params
        sortTypes.forEach(type => { // cycle through the sortTypes and if it matches one (validation), set the sortType store
            if (type === $page.url.searchParams.get('sortType').toLowerCase()) {
                $filters.sortType = $page.url.searchParams.get('sortType').toLowerCase();
            }
        })
    }

    $: if (form) {
        for (const [key, value] of Object.entries(form)) {
            if (key !== 'region' && key !== 'radius') {
                $allComments[key] = value;
            }
        }
    }

    $: searchInput = form?.searchInput

    let regionData;
    $: if (form?.regionResults) {
        regionData = form.regionResults
    }

    $: birdData = data.birdObs
    let filteredData;
    $: {
        // $loading = false
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
            <!-- globe svg -->
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                <path fill="currentColor" d="M221.6 173.3A102.9 102.9 0 0 0 232 128a104.2 104.2 0 0 0-77.2-100.5h-.5A103.8 103.8 0 0 0 60.4 49l-1.3 1.2A103.9 103.9 0 0 0 128 232h2.4a104.3 104.3 0 0 0 90.6-57.4ZM216 128a89.3 89.3 0 0 1-5.5 30.7l-46.4-28.5a15.4 15.4 0 0 0-6.3-2.3l-22.8-3a16.1 16.1 0 0 0-15.3 6.8h-8.6l-3.8-7.9a16.2 16.2 0 0 0-11-8.7l-6.6-1.4l2.6-5.9a7.8 7.8 0 0 1 7.3-4.9h16.1a16.1 16.1 0 0 0 7.7-2l12.2-6.8a16.1 16.1 0 0 0 3-2.1l26.9-24.4a15.7 15.7 0 0 0 4.5-16.9a88 88 0 0 1 46 77.3Zm-176 0a87.1 87.1 0 0 1 9.5-39.7l10.4 27.9a16.1 16.1 0 0 0 11.6 10l5.5 1.2h.1l12 2.6a7.8 7.8 0 0 1 5.5 4.3l2.1 4.4a16.1 16.1 0 0 0 14.4 9h1.2l-7.7 17.2a16.1 16.1 0 0 0 2.8 17.4l16.1 17.4a8.3 8.3 0 0 1 2 6.9l-1.8 9.3A88.1 88.1 0 0 1 40 128Z"/>
            </svg>
            <span class="hidden sm:inline">Location</span>
            <!-- triangle -->
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path fill="currentColor" d="m4.427 7.427l3.396 3.396a.25.25 0 0 0 .354 0l3.396-3.396A.25.25 0 0 0 11.396 7H4.604a.25.25 0 0 0-.177.427Z"/>
            </svg>
        </button>
        <button class="flex items-center gap-1 text-sky-300" on:click={()=> showFilterModal = true}>
            <!-- filter icon  -->
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12"><path fill="currentColor" d="M1 2.75A.75.75 0 0 1 1.75 2h8.5a.75.75 0 0 1 0 1.5h-8.5A.75.75 0 0 1 1 2.75Zm2 3A.75.75 0 0 1 3.75 5h4.5a.75.75 0 0 1 0 1.5h-4.5A.75.75 0 0 1 3 5.75ZM5.25 8a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5h-1.5Z"/></svg>
            <span class="hidden sm:inline">Filters</span>
            <!-- triangle icon -->
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path fill="currentColor" d="m4.427 7.427l3.396 3.396a.25.25 0 0 0 .354 0l3.396-3.396A.25.25 0 0 0 11.396 7H4.604a.25.25 0 0 0-.177.427Z"/>
            </svg>
        </button>
    </div>
    {#if locationModalDisplay}
        <div class="relative z-10" 
            transition:fly={{ x: -200 }}
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
            transition:fly={{ x: 200 }}
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
        <SortBar on:openFilterModal={() => showFilterModal = true}/>
    </div>

    <ul class="container mx-auto max-w-5xl p-4">

        {#if $loading}
            <p class="animate-pulse">Loading...</p>
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
                        />
                    {/each}
                {/if}
            {/if}
        {/if}
    </ul>
</div>