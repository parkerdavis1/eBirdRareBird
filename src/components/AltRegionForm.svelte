<script>
    import { enhance } from '$app/forms';
    import { debounce } from '../debounce';
    import { clickOutside } from '../utils/click-outside';
    export let regionData;
    export let searchInput;

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
    let regionSubmitForm;

    function regionInputChange() {
        console.log('HELLO')
        regionSearchForm.requestSubmit();
        regionInputElement.blur();
    }

    function handleRegionSelect() {
        $region.region = loc.code;
        regionSubmitForm.submit();
    }
    
    function handleOutclick() {
        regionResultsList = null
    }
    function escape(event) {
        if (event.key === 'Escape') {
            regionResultsList = null
        }
    }
 
</script>

<svelte:window on:keydown={escape} />

<form method="POST" bind:this={regionSearchForm} id="regionSearch" action="?/regionSearch" on:submit|preventDefault use:enhance></form>
    <div class="relative">
        <!-- <label for="regionInput">Region Search</label> -->
        <input 
            type="text" 
            id="regionInput" 
            name="regionSearch" 
            form="regionSearch" 
            value={searchInput ? searchInput : ''} 
            bind:this={regionInputElement}
            on:input={debounce(regionInputChange, 500)}
            autocomplete="off"
            placeholder="Search for region"
            class="w-full"
            >
        <!-- <button type="submit">Region Search</button> -->
        {#if regionResultsList}

        <!-- REGION SELECT LIST MODAL  -->
        <div use:clickOutside on:outclick={handleOutclick}
            style="top: calc(100%)" 
            class="absolute max-h-60 overflow-y-scroll rounded-sm w-full
                dark:bg-slate-600 bg-slate-50 
                outline outline-black outline-1
                ">
            <ul>
                {#if regionResultsList.length > 0}
                    {#each regionResultsList as loc}
                    <li class="p-2 hover:bg-sky-200">
                        <button class="w-full text-left" type="submit" form="region" on:click={()=> $region.region=loc.code}>
                            {loc.name}
                        </button>
                    </li>
                    {/each}
                {:else}
                    <li class="p-2 opacity-50">No Results</li>
                {/if}

            </ul>
        </div>

        <!-- <br>
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
        </select> -->
        {/if}
    </div>

<form method="POST" id="region" action="?/region" class="container" bind:this={regionSubmitForm}>
    <input type="hidden" name="regionId" form="region" bind:value={$region.region} required>
    <input type="hidden" name="days" form="region" bind:value={$region.days} required>
    
</form>
    <div class="grid">
        <!-- <label for="days">Time period (days ago): {$region.days}</label> -->
        <!-- <input type="range" name="days" id="days" min="1" max="30" bind:value={$region.days}> -->
    </div>
    <!-- <button type="submit" class="submit-button" form="region" on:click={handleSubmit}>
        {$loading ? "Loading..." : "Submit"}
    </button> -->

<style>

</style>