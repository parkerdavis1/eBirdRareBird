<script>
    import { enhance, applyAction } from '$app/forms';
    import { browser } from '$app/environment';
    import { debounce } from '../debounce';
    export let regionData;

    import { region, loading } from '../store';

    function handleSubmit() {
        $loading = true;
        // setTimeout(() => {
        //     document.getElementById('results-container').scrollIntoView()
        // }, 1000);
    }

    let regionResultsList;
    $: if (regionData) {
        // console.log('regionData: ', regionData)
        regionResultsList = regionData;
        // selectOptions = regionData;
    };

    let regionSelect;
    let regionSearchForm;
    let regionInputElement;
    let selectElement;

    function regionInputChange() {
        console.log('HELLO')
        regionSearchForm.requestSubmit();
        regionInputElement.blur();
    }
 
</script>

<form method="POST" bind:this={regionSearchForm} id="regionSearch" action="?/regionSearch" on:submit|preventDefault use:enhance>
    <div>
        <!-- <label for="regionInput">Region Search</label> -->
        <input 
            type="text" 
            id="regionInput" 
            name="regionSearch" 
            form="regionSearch" 
            bind:value={regionSelect} 
            bind:this={regionInputElement}
            on:input={debounce(regionInputChange, 2000)}
            required 
            autocomplete="off"
            placeholder="Search for region"
            >
        <!-- <button type="submit">Region Search</button> -->
        {#if regionResultsList}
        <br>
        <label for="regionSelect">Select a region:</label>
        <select 
            name="region" 
            form="region" 
            id="regionSelect" 
            bind:value={$region.region} 
            bind:this={selectElement}
            >

            {#each regionResultsList as option}
                {#if regionResultsList.length === 1}
                <option value={option.code} selected>{option.name}</option>
                {:else}
                <option value={option.code}>{option.name}</option>
                {/if}
            {/each}
        </select>
        {/if}
    </div>
</form>

<form method="POST" id="region" action="?/region" class="container" use:enhance=
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
        <!-- <div>
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
            </select>
        </div> -->
            
        <label for="days">Time period (days ago): {$region.days}</label>
        <input type="range" name="days" id="days" min="1" max="30" bind:value={$region.days}>

    </div>
    <button type="submit" class="submit-button" on:click={handleSubmit}>
        {$loading ? "Loading..." : "Submit"}
    </button>

</form>