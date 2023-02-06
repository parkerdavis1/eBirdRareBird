<script>
    export let sortType
    export let radiusGroupList
    export let groupedRadiusBirdData
    export let regionGroupList
    export let groupedRegionBirdData
    export let showAll
    export let allComments

    import BirdName from "./BirdName.svelte";
    import LocationName from "./LocationName.svelte";
</script>

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