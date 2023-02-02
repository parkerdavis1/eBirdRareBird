<script>
    import { enhance } from '$app/forms';
    import { days } from '../store';

    let distance = 20;
    $: distance_mi = Math.round(distance * 0.62137119);
    let latLon;

    const handleLocate = () => {
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
            latLon = '';
            latLon = `${position.coords.latitude},${position.coords.longitude}`
        }
        navigator.geolocation.getCurrentPosition(success, error, options);
    }
</script>

<form method="POST" action="?/radius" class="container" use:enhance>
    <div class="grid">
        <div>
            <label for="location" hidden>GPS coordinates</label>
            <input type="text" id="location" name="location" bind:value={latLon} placeholder="GPS coordinates" required>
            
            <button class="p-1 rounded 
                            bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600"
                    on:click|preventDefault={handleLocate}>Locate</button>

        </div>

        <label for="days">Time period (days ago): {$days}</label>
        <input type="range" name="days" id="days" min="1" max="30" bind:value={$days}>

        <label for="distance" class="flex justify-between">Distance: {distance_mi}mi ({distance}km)</label>
        <input type="range" name="distance" id="distance" min="1" max="50" bind:value={distance}>
    </div>
    <button type="submit" class="submit-button">Submit</button>
</form>