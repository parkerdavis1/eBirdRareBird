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
        console.log('regionData: ', regionData)
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
            on:input={debounce(regionInputChange, 1000)}
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

<form method="POST" id="region" action="?/region" class="container">
    <div class="grid">
        <input type="hidden" name="regionId" bind:value={$region.region}>
        <label for="days">Time period (days ago): {$region.days}</label>
        <input type="range" name="days" id="days" min="1" max="30" bind:value={$region.days}>
    </div>
    <button type="submit" class="submit-button" on:click={handleSubmit}>
        {$loading ? "Loading..." : "Submit"}
    </button>

</form>