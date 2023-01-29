<script>
    // export let data;

    export let form;

    import BirdName from "../components/BirdName.svelte";
    import LocationName from '../components/LocationName.svelte'
    import BirdResult from "../components/BirdResult.svelte";
    import LocationField from "../components/LocationField.svelte";
    // import { latLon } from "../store";
    import { enhance } from '$app/forms';
    import RadiusForm from "../components/RadiusForm.svelte";
    import RegionForm from "../components/RegionForm.svelte";

    let days = 7;
    let distance = 20;
    $: distance_mi = Math.round(distance * 0.62137119);
    let radius = true;
    let radiusRegion = 'region';
    let region = "";
    let showAll = false;
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

    function groupBy (array, sortType) {
        let groupedObj = {};
        array.forEach(birdObs => {
            let groupId;
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
        groupedRadiusBirdData = groupBy(radiusBirdData, sortType);
        radiusGroupList = Object.keys(groupedRadiusBirdData).sort()
        console.log(groupedRadiusBirdData);
    }
    $: if (regionBirdData) {
        groupedRegionBirdData = groupBy(regionBirdData, sortType);
        regionGroupList = Object.keys(groupedRegionBirdData).sort()
        console.log(groupedRegionBirdData);
    }

</script>
    
<h1>eBird Rare Bird Alert</h1>
<div>
    <div class="grid form-select">
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

<hr>

<div class="grid">
    <div>
        <input type="checkbox" id="showAll" bind:checked={showAll}>
        <label for="showAll">Show all details</label>
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

<hr>

{#if radiusRegion === 'radius'}
    {#if radiusGroupList}
        {#if sortType === 'species'}
            {#each radiusGroupList as bird}
                <BirdName 
                    birdName={bird} 
                    birdData={groupedRadiusBirdData}
                    showAll={showAll}
                    allComments={allComments}
                />
            {/each}
        {:else if sortType === 'location'}
            {#each radiusGroupList as location}
                <LocationName 
                    locationName={location} 
                    birdData={groupedRadiusBirdData}
                    showAll={showAll}
                    allComments={allComments}
                />
            {/each}
        {/if}
    {/if}

{:else if radiusRegion === 'region'}
    {#if regionGroupList}
        {#if sortType === 'species'}
            {#each regionGroupList as bird}
                <BirdName 
                    birdName={bird} 
                    birdData={groupedRegionBirdData}
                    showAll={showAll}

                    allComments={allComments}
                />
            {/each}
        {:else if sortType === 'location'}
            {#each regionGroupList as location}
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



<style>
    :root {
        font-size: 14px;
        font-family: sans-serif;
    }

    .form-select {
        padding-bottom: 2rem;
    }
    
    h1 {
        text-align: center;
    }
</style>