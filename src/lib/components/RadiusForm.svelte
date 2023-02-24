<script>
    import { enhance, applyAction } from '$app/forms';
    import { loading, radius, latLon } from '$lib/store';

    $: distance_mi = Math.round($radius.distance * 0.62137119);

    const handleLocate = () => {
        const options = {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 1800000
        };
        const error = (error) => {
            // locateButtonText = 'Error!';
            console.warn(`ERROR(${error.code}): ${error.message}`);
        }
        const success = (position) => {
            // const coord = position.coords;
            // console.log('Your current position is:');
            // console.log(`Latitude: ${coord.latitude}`);
            // console.log(`Longitude: ${coord.longitude}`);
            // console.log(`More or less ${coord.accuracy} meters.`);
            console.log(position);
            $latLon = '';
            $latLon = `${position.coords.latitude},${position.coords.longitude}`
        }
        navigator.geolocation.getCurrentPosition(success, error, options);
    }
    
    const latLonRegex = /\s*-?\d+\.\d+,\s*-?\d+\.\d+\s*/;
    $: latLonValid = $latLon?.match(latLonRegex)

</script>

<form method="POST" action="?/radius" class="container p-4"  use:enhance=
    {({ form, data, action }) => {
    // before form is submitted
    console.log('form: ', form)
    console.log('data: ', data)
    console.log('action: ', action)

    return async ({ result, update }) => {
        // after form is submitted
        console.log('result: ', result)
        await applyAction(result)
        document.getElementById('results-container').scrollIntoView({ behavior: "smooth"})
    }}}>
    <div class="grid">
        <div>
            <label for="location" hidden>GPS coordinates</label>
            <input type="text" id="location" name="location" bind:value={$latLon} placeholder="GPS coordinates" required>
            
            <button class="my-1 p-1 rounded 
                            bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600"
                    on:click|preventDefault={handleLocate}>Locate</button>

        </div>

        <label for="days">Time period (days ago): {$radius.days}</label>
        <input type="range" name="days" id="days" min="1" max="30" bind:value={$radius.days}>

        <label for="distance" class="flex justify-between">Distance: {distance_mi}mi</label>
        <input type="range" name="distance" id="distance" min="1" max="50" bind:value={$radius.distance}>
    </div>
    <button type="submit" class="submit-button" on:click={() => $loading = true} disabled={!latLonValid}>Submit</button>
</form>