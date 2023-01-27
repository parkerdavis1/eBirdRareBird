<script>
    import { enhance } from '$app/forms';

    import { days } from '../store';
    let region = '';
</script>


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
            <label for="days">Time period (days ago): {$days}
                <input type="range" name="days" id="days" min="1" max="30" bind:value={$days}>
            </label>
        </div>
    </div>
    <button type="Submit">Submit</button>
</form>