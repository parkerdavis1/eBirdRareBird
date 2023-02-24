<script>
    import { enhance, applyAction } from '$app/forms';
    import { debounce } from '../debounce';
    import { clickOutside } from '../utils/click-outside';
    export let regionData;

    import { region, loading } from '../store';

    function handleSubmit() {
        $loading = true;
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
    let regionSearchHiddenSubmitButton;
    let regionSearchLoading = false;
    let regionInputText = '';

    function regionInputChange() {
        // regionSearchForm.submit();
        regionSearchHiddenSubmitButton.click()
        // regionInputElement.blur();
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

<form method="POST" bind:this={regionSearchForm} id="regionSearch" action="?/regionSearch" on:submit|preventDefault 
    use:enhance={({ form, data, action }) => {
            console.log('form:', form)
            console.log('data:', data)
            console.log('action:', action)
            regionSearchLoading = true;


        return async ({ result }) => {
            // console.log('result:', result)
            regionResultsList = result.data.regionResults;
            regionSearchLoading = false;
        }
    }
    
    }>
    <div class="relative">
        <input 
        type="text" 
        id="regionInput" 
        name="regionSearch" 
        form="regionSearch"
        bind:value={regionInputText}
        bind:this={regionInputElement}
        on:input={debounce(regionInputChange, 500)}
        autocomplete="off"
        placeholder="Search for region"
        class="w-full"
        >
        <div class="flex absolute top-0 right-0 bottom-0 h-full justify-end items-center p-2">
        {#if regionSearchLoading}
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"><path stroke-dasharray="60" stroke-dashoffset="60" stroke-opacity=".3" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.3s" values="60;0"/></path><path stroke-dasharray="15" stroke-dashoffset="15" d="M12 3C16.9706 3 21 7.02944 21 12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></g></svg>
        {:else if regionInputText?.length > 0}
            <button on:click={()=> regionInputText = ''}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 256 256"><path fill="currentColor" d="M208.5 191.5a12 12 0 0 1 0 17a12.1 12.1 0 0 1-17 0L128 145l-63.5 63.5a12.1 12.1 0 0 1-17 0a12 12 0 0 1 0-17L111 128L47.5 64.5a12 12 0 0 1 17-17L128 111l63.5-63.5a12 12 0 0 1 17 17L145 128Z"/></svg>
            </button>
        {/if}
        </div>
    </div>

    <!-- value={searchInput ? searchInput : ''} -->

    <button type="submit" form="regionSearch" hidden bind:this={regionSearchHiddenSubmitButton}>Region Search</button>
</form>
    <div class="relative">
        <!-- <label for="regionInput">Region Search</label> -->


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