<script>
    // export let data;

    export let form;

    import BirdName from "../components/BirdName.svelte";
    import LocationName from '../components/LocationName.svelte'
    import BirdResult from "../components/BirdResult.svelte";
    import LocationField from "../components/LocationField.svelte";
    import { enhance } from '$app/forms';
    import RadiusForm from "../components/RadiusForm.svelte";
    import RegionForm from "../components/RegionForm.svelte";

    import { loading } from "../store";
    import { page } from '$app/stores';

    let days = 7;
    let distance = 20;
    $: distance_mi = Math.round(distance * 0.62137119);
    let radius = true;
    let radiusRegion = 'region';
    let region = "";
    let showAll = false;
    let hideUnconfirmed = false;
    let sortType;
    let allComments = {}
    $: if (form) {
        for (const [key, value] of Object.entries(form)) {
            if (key !== 'region' && key !== 'radius') {
                allComments[key] = value;
            }
        }
        // console.log(allComments);
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

    function getBirdList(array) {
        let arr = [];
        array.forEach(birdObs => {
            const comName = birdObs.comName;
            if (!arr.includes(comName)) {
                arr.push(comName);
            }
        })
        // return alphabetical list of bird names
        return arr.sort();
    }

    let radiusGroupList;
    let regionGroupList;
    let groupedRadiusBirdData;
    let groupedRegionBirdData;
    let regionBirdData;
    let radiusBirdData;

    $: if (form?.region) {
        regionBirdData = form.region;
    }

    $: if (form?.radius) {
        radiusBirdData = form.radius;
    }

    $: if (radiusBirdData) {
        $loading = false;
        groupedRadiusBirdData = groupBy(radiusBirdData, sortType, hideUnconfirmed);
        radiusGroupList = Object.keys(groupedRadiusBirdData).sort()
        console.log(groupedRadiusBirdData);
    }
    $: if (regionBirdData) {
        $loading = false;
        groupedRegionBirdData = groupBy(regionBirdData, sortType, hideUnconfirmed);
        regionGroupList = Object.keys(groupedRegionBirdData).sort()
        console.log(groupedRegionBirdData);
    }
</script>

<h1 class="text-center text-xl font-medium pb-2">eBird Rare Bird Alert</h1>

<div class="p-2
        bg-slate-50 dark:bg-slate-800">
    <div>
        <select name="radiusRegion" id="radiusRegion" bind:value={radiusRegion}>
            <option value="radius">Radius from...</option>
            <option value="region">Region</option>
        </select>
        <!-- <button class="contrast" class:outline="{!radius}" on:click={()=>radius = true}>Radius from</button> -->
        <!-- <button class="contrast" class:outline="{radius}" on:click={()=> radius = false}>Region</button> -->
    </div>

    {#if radiusRegion == 'radius'}
        <RadiusForm />
    {:else if radiusRegion == 'region'}
        <RegionForm />
    {/if}

</div>

<div class="flex flex-row flex-wrap justify-between my-3">
    <div>
        <input type="checkbox" id="showAll" bind:checked={showAll}>
        <label for="showAll">Show all details</label>
    </div>
    <div>
        <input type="checkbox" id="hideUnconfirmed" bind:checked={hideUnconfirmed}>
        <label for="hideUnconfirmed">Hide Unconfirmed</label>
    </div>
    <div>
        <label for="sort">Sort by:</label>
        <select name="sort" id="sort" bind:value={sortType}>
            <option value="species">Species</option>
            <!-- <option value="date">Date</option> -->
            <option value="location">Location</option>
        </select>
    </div>
</div>

{#if $loading}
    <p class="animate-pulse">Loading...</p>
{:else if $page.error}
    <p>{$page.status}: {$page.error.message}</p>
{:else}
    {#if radiusRegion === 'radius' && radiusGroupList}
        {#if sortType === 'species'}
            {#each radiusGroupList as bird (bird)}
                <BirdName 
                    birdName={bird} 
                    birdData={groupedRadiusBirdData}
                    showAll={showAll}
                    allComments={allComments}
                />
            {/each}
        {:else if sortType === 'location'}
            {#each radiusGroupList as location (location)}
                <LocationName 
                    locationName={location} 
                    birdData={groupedRadiusBirdData}
                    showAll={showAll}
                    allComments={allComments}
                />
            {/each}
        {/if}

    {:else if radiusRegion === 'region' && regionGroupList}
        {#if sortType === 'species'}
            {#each regionGroupList as bird (bird)}
                <BirdName 
                    birdName={bird} 
                    birdData={groupedRegionBirdData}
                    showAll={showAll}

                    allComments={allComments}
                />
            {/each}
        {:else if sortType === 'location'}
            {#each regionGroupList as location (location)}
                <LocationName 
                    locationName={location} 
                    birdData={groupedRegionBirdData}
                    showAll={showAll}

                    allComments={allComments}
                />
            {/each}
        {/if}
    {/if}
{/if}