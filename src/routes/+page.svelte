<script>
    export let data;

    import BirdName from "../components/BirdName.svelte";
    import BirdResult from "../components/BirdResult.svelte";
    import LocationField from "../components/LocationField.svelte";
    import { latLon } from "../store";


    const handleLocate = (event) => {
        event.preventDefault();
        const options = {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 1800000
        };
        const error = (error) => {
            locateButtonText = 'Error!';
            console.warn(`ERROR(${error.code}): ${error.message}`);
        }
        const success = (position) => {
            const coord = position.coords;
            console.log('Your current position is:');
            console.log(`Latitude: ${coord.latitude}`);
            console.log(`Longitude: ${coord.longitude}`);
            console.log(`More or less ${coord.accuracy} meters.`);
            console.log(position);
            $latLon = `${position.coords.latitude},${position.coords.longitude}`
        }
        navigator.geolocation.getCurrentPosition(success, error, options);
    }


</script>

<h1>eBird Rare Bird Alert</h1>

<form method="POST" class="container">
    <!-- <LocationField /> -->
    <label for="location">GPS coordinates</label>
    <input type="text" id="location" name="location" bind:value={$latLon} placeholder="GPS coordinates">
    
    <button class="contrast outline" on:click={handleLocate}>Locate</button>


    <button type="submit">Submit</button>
</form>

<!-- 
{#if data.birds}
    {#each data.birds as bird, id }
        <BirdResult birdData={bird}/>
    {/each}
{/if} -->

{#if data.birds}
    {#each data.birds as bird, id}
        <BirdName 
            birdName={bird} 
            birdData={data.birdData}
        />
    {/each}
{/if}


<style>
    :root {
        font-size: 14px;
        font-family: sans-serif;
    }
    form {
        max-width: 40rem;
    }
</style>