<script>
    import { enhance } from '$app/forms';
    import { debounce } from '$lib/utils/debounce';
    import { clickOutside } from '$lib/utils/click-outside';
    export let regionData;

    import { region, filters } from '$lib/store';

    let regionResultsList;
    $: if (regionData) {
        regionResultsList = regionData;
    };

    let regionSearchForm;
    let regionInputElement;
    let regionSubmitForm;
    let regionSearchHiddenSubmitButton;
    let regionSearchLoading = false;
    let regionInputText = '';

    function regionInputChange() {
        regionSearchHiddenSubmitButton.click()
    }
    
    function handleOutclick() {
        regionResultsList = null
    }

    function escape(event) {
        if (event.key === 'Escape') {
            regionResultsList = null
            handleXClick()
        }
    }

    function handleXClick() {
        regionInputText = ''
        regionInputElement.focus()
    }
 
</script>

<svelte:window on:keydown={escape} />

<form method="POST" bind:this={regionSearchForm} id="regionSearch" action="?/regionSearch" on:submit|preventDefault 
    class="relative w-full"
    use:enhance={() => {
            regionSearchLoading = true;
        return async ({ result }) => {
            regionResultsList = result?.data.regionResults;
            regionSearchLoading = false;
        }
    }}>
    <div class="input-container relative flex items-strech px-1 rounded-full
    bg-white text-slate-900
    border border-solid border-slate-800">
        <div class="flex justify-center items-center p-2">
            <svg class="h-6 w-6 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="m18.9 20.3l-5.6-5.6q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.612 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l5.625 5.625q.275.275.275.675t-.3.7q-.275.275-.7.275t-.7-.275ZM9.5 14q1.875 0 3.188-1.313T14 9.5q0-1.875-1.313-3.188T9.5 5Q7.625 5 6.312 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14Z"/></svg>
        </div>

        <input 
            type="text" 
            id="regionInput" 
            name="regionSearch" 
            form="regionSearch"
            bind:value={regionInputText}
            bind:this={regionInputElement}
            on:input={debounce(regionInputChange, 300)}
            autocomplete="off"
            placeholder="Enter a county"
            class="w-full max-w-full focus:outline-none"
            >
        <div class="flex justify-end items-center p-2">
            {#if regionSearchLoading}
                <!-- loading circle animation -->
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"><path stroke-dasharray="60" stroke-dashoffset="60" stroke-opacity=".3" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.3s" values="60;0"/></path><path stroke-dasharray="15" stroke-dashoffset="15" d="M12 3C16.9706 3 21 7.02944 21 12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></g></svg>
            {:else if regionInputText?.length > 0}
                <button on:click={handleXClick}>
                    <!-- X out  -->
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path fill="currentColor" d="M208.5 191.5a12 12 0 0 1 0 17a12.1 12.1 0 0 1-17 0L128 145l-63.5 63.5a12.1 12.1 0 0 1-17 0a12 12 0 0 1 0-17L111 128L47.5 64.5a12 12 0 0 1 17-17L128 111l63.5-63.5a12 12 0 0 1 17 17L145 128Z"/></svg>
                </button>
            {/if}
        </div>
        {#if regionResultsList}
            <!-- REGION SELECT LIST MODAL  -->
            <div use:clickOutside on:outclick={handleOutclick}
                class="absolute top-full left-0 max-h-60 overflow-y-scroll rounded-sm w-full
                     bg-slate-50 
                    outline outline-black outline-1
                    ">
                <ul>
                    {#if regionResultsList.length > 0}
                        {#each regionResultsList as loc}
                        <li class="p-2 hover:bg-sky-100">
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
        {/if}
    </div>
   

    <button type="submit" form="regionSearch" hidden bind:this={regionSearchHiddenSubmitButton}>Region Search</button>
</form>

<form method="POST" id="region" action="?/region" class="container" bind:this={regionSubmitForm}>
    <input type="hidden" name="regionId" form="region" bind:value={$region.region} required>
    <input type="hidden" name="days" form="region" bind:value={$filters.days} required>
</form>