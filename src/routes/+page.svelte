<script>
    export let data;

    import { enhance } from '$app/forms'
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

    let days = 3;
    let distance = 10;
    $: distance_mi = Math.round(distance * 0.62137119);
    let radius = true;
    let region = "";
    let showAll = false;

</script>

<h1>eBird Rare Bird Alert</h1>
<div>
    <div class="grid form-select">
        <button class="contrast" class:outline="{!radius}" on:click={()=>radius = true}>Radius from</button>
        <button class="contrast" class:outline="{radius}" on:click={()=> radius = false}>Region</button>
    </div>

    <!-- Radius Form -->
    {#if radius}
        <form method="POST" action="?/radius" class="container" use:enhance>
            <div class="grid">
                <div>
                    <label for="location">GPS coordinates</label>
                    <input type="text" id="location" name="location" bind:value={$latLon} placeholder="GPS coordinates" required>
                    
                    <button class="secondary" on:click={handleLocate}>Locate</button>

                </div>
                <div>
                    <label for="days">Time period (days ago): {days}
                        <input type="range" name="days" id="days" min="1" max="30" bind:value={days}>
                    </label>

                    <label for="distance">Distance: {distance_mi}mi ({distance}km)
                        <input type="range" name="distance" id="distance" min="1" max="50" bind:value={distance}>
                    </label>
                </div>

            </div>

            <button type="submit">Submit</button>
        </form>

    <!-- Region Form -->
    {:else}

        <form method="POST" action="?/region" class="container" use:enhance>
            <div class="grid">
                <div>
                    <label for="region">Region Code:</label>

                    <select name="region" id="region" bind:value={region}>
                        <option value="US-AZ-013">Maricopa, AZ</option>
                        <option value="US-AZ">Arizona</option>
                    </select>
                </div>
                <div>
                    <label for="days">Time period (days ago): {days}
                        <input type="range" name="days" id="days" min="1" max="30" bind:value={days}>
                    </label>
                </div>
            </div>

            <button type="Submit">Submit</button>
        </form>

    {/if}
</div>

<hr>

<div class="grid">
    <div>
        <input type="checkbox" id="showAll" bind:checked={showAll}>
        <label for="showAll">Show all details</label>
    </div>
    <div>
        <!-- <label for="sort">Sort by:</label>
        <select name="sort" id="sort">
            <option value="species">Species</option>
            <option value="date">Date</option>
            <option value="location">Location</option>
        </select> -->
    </div>
</div>

<hr>

{#if data.birds}
    {#each data.birds as bird, id}
        <BirdName 
            birdName={bird} 
            birdData={data.birdData}
            showAll={showAll}
        />
    {/each}
{/if}


<style>
    :root {
        font-size: 14px;
        font-family: sans-serif;
    }
    form {
        width: 80%;
    }
    .form-select {
        padding-bottom: 2rem;
    }
    h1 {
        text-align: center;
    }
</style>