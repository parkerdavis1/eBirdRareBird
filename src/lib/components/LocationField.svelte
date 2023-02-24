<script>
    // import { latLon } from '../store.js'
    let latLon;

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
      latLon = `${position.coords.latitude},${position.coords.longitude}`
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  }



</script>


<form action="">
    <label for="location">GPS coordinates</label>
    <input type="text" id="location" bind:value={latLon} placeholder="GPS coordinates">

    <button on:click={handleLocate}>Locate</button>
</form>


<p>{latLon}</p>

<style>
    form {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
</style>