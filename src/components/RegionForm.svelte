<script>
    import { enhance } from '$app/forms';

    import { days, loading } from '../store';
    let region = 'US-AZ-013';
</script>


<form method="POST" action="?/region" class="container" use:enhance>
    <div class="grid">
        <div>
            <label for="region">Region Code:</label>
            <select name="region" id="region" bind:value={region}>
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
                <option value="US-AZ">Arizona</option>
            </select>
        </div>

        <label for="days">Time period (days ago): {$days}</label>
        <input type="range" name="days" id="days" min="1" max="30" bind:value={$days}>

    </div>
    <button type="Submit" class="submit-button" on:click={() => $loading = true}>
        {$loading ? "Loading..." : "Submit"}
    </button>
</form>