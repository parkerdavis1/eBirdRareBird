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
            <label for="location">GPS coordinates</label>
            <input type="text" id="location" name="location" bind:value={latLon} placeholder="GPS coordinates" required>
            
            <button class="secondary" on:click|preventDefault={handleLocate}>Locate</button>

        </div>
        <div>
            <label for="days">Time period (days ago): {$days}
                <input type="range" name="days" id="days" min="1" max="30" bind:value={$days}>
            </label>

            <label for="distance">Distance: {distance_mi}mi ({distance}km)
                <input type="range" name="distance" id="distance" min="1" max="50" bind:value={distance}>
            </label>
        </div>
    </div>
    <button type="submit">Submit</button>
</form>