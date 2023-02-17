<script>
    import { enhance, applyAction } from '$app/forms';
    import { browser } from '$app/environment';
    

    import { region, loading } from '../store';

    function handleSubmit() {
        $loading = true;
        // setTimeout(() => {
        //     document.getElementById('results-container').scrollIntoView()
        // }, 1000);
    }
</script>


<form method="POST" action="?/region" class="container" use:enhance=
    {({ form, data, action }) => {
    // before form is submitted
    // console.log('form: ', form)
    // console.log('data: ', data)
    // console.log('action: ', action)

    return async ({ result, update }) => {
        // after form is submitted
        // console.log('result: ', result)
        await applyAction(result)
        document.getElementById('results-container').scrollIntoView({ behavior: "smooth"})
    }
}}>
    <div class="grid">
        <div>
            <label for="region">Region Code:</label>
            <select name="region" id="region" bind:value={$region.region}>
                <option value="US-AZ-001">Apache</option>
                <option value="US-AZ-003">Cochise</option>
                <option value="US-AZ-005">Coconino</option>
                <option value="US-AZ-007">Gila</option>
                <option value="US-AZ-009">Graham</option>
                <option value="US-AZ-011">Greenlee</option>
                <option value="US-AZ-012">La Paz</option>
                <option value="US-AZ-013">Maricopa</option>
                <option value="US-AZ-015">Mohave</option>
                <option value="US-AZ-017">Navajo</option>
                <option value="US-AZ-019">Pima</option>
                <option value="US-AZ-021">Pinal</option>
                <option value="US-AZ-023">Santa Cruz</option>
                <option value="US-AZ-025">Yavapai</option>
                <option value="US-AZ-027">Yuma</option>
                <!-- <option value="US-AZ">Arizona</option> -->
            </select>
        </div>

        <label for="days">Time period (days ago): {$region.days}</label>
        <input type="range" name="days" id="days" min="1" max="30" bind:value={$region.days}>

    </div>
    <button type="Submit" class="submit-button" on:click={handleSubmit}>
        {$loading ? "Loading..." : "Submit"}
    </button>

</form>