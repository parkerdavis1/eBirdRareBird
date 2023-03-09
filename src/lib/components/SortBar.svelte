<script>
    import { filters, isRadiusView, region } from '$lib/store'
    import { createEventDispatcher } from 'svelte';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import FilterModal from '$lib/components/FilterModal.svelte';
    import FilterTag from '$lib/components/FilterTag.svelte';
    import { clickOutside } from '$lib/utils/click-outside';
    import { fade, fly } from 'svelte/transition'

    const dispatch = createEventDispatcher();

    let showAll;
    let openSort;

    function dispatchShowAll() {
        dispatch('showAllChange', {
            showAll: showAll
        })
    }
    $: {
        showAll = showAll;
        dispatchShowAll()
    }

    let showFilterModal = false;

    function handleFilterButtonClick() {
        // console.log("handleFilterButtonClick")
        if (showFilterModal == false) {
            showFilterModal = true;
        }
    }

    function handleOutclick() {
        setTimeout(()=> {
            if (showFilterModal == true) {
                showFilterModal = false;
            }
        })
    }

    let activeFilters;
    $: if ($filters) { //include this to update activeFilters when filters changes
        activeFilters = getActiveFilters()
    }

   function getActiveFilters() {
        let activeFilters = []
        for (const [key, value] of Object.entries($filters)) {
            // console.log('[key, value]', [key, value])
            if (value.value && value.value === true) {
                activeFilters.push({ key, value })
            }
        }
        // console.log('activeFilters!', activeFilters)
        return activeFilters;
   } 

//    $: days = $page.url.searchParams.get('days')
   $: {
    // console.log('days store from sort bar:', $filters.days)
   }

   $: daysAgoFilter = { value: { label: `Observations for past ${$filters.days == 1 ? 'day' : `${$filters.days} days`}` } }

   function handleSortClick(sortType) {
        $page.url.searchParams.set('sortType', sortType)
        goto(`?${$page.url.searchParams.toString()}`);
        $filters.sortType = sortType;
        openSort = false;
   }

   function handleSortByOutclick() {
        openSort = false;
   }

</script>

<div id="results-container" class="flex flex-row flex-wrap sm:flex-row items-baseline gap-x-4 mt-4 relative">
    <!-- <div class:hidden={$filters.sortType === 'date'}>
        <input type="checkbox" id="showAll" bind:checked={showAll}>
        <label for="showAll">Expand all</label>
    </div> -->
    <div class="flex items-start gap-x-4 w-full md:flex-nowrap">
        <div class="flex justify-start gap-2 flex-wrap">
                <button on:click={() => dispatch('openFilterModal')}>
                    <FilterTag filter={daysAgoFilter} daysAgo={true}/>
                </button>
            {#each activeFilters as filter}
                <FilterTag filter={filter} />
            {/each}
        </div>

        <div class="ml-auto relative whitespace-nowrap">
            <button 
                class="flex items-center text-sm" 
                on:click={() => openSort = !openSort}
                use:clickOutside on:outclick={handleSortByOutclick}
                >
                Sort by 
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                    <path fill="currentColor" d="m4.427 7.427l3.396 3.396a.25.25 0 0 0 .354 0l3.396-3.396A.25.25 0 0 0 11.396 7H4.604a.25.25 0 0 0-.177.427Z"/>
                </svg>
            </button>
            {#if openSort}
                <div class="sort-modal">
                    <button class="sort-options" on:click={() => handleSortClick('taxonomic')}>Species (taxonomic)</button>
                    <button class="sort-options" on:click={()=> handleSortClick('alpha')}>Species (alphabetic)</button>
                    <button class="sort-options" on:click={()=> handleSortClick('location')}>Location</button>
                    <button class="sort-options" on:click={()=> handleSortClick('date')}>Date</button>
                </div>
            {/if}
        </div>
    </div>

</div>

<style lang="postcss">
    .sort-options {
        @apply whitespace-nowrap py-1;
    }
    .sort-modal {
        top: calc(100% + 1rem);
        position: absolute;
        right: 0;
        /* background: #ffffff; */
        /* border: 1px solid #000000; */
        @apply z-10 border-slate-300 bg-white dark:bg-slate-900 dark:border-slate-400
        border p-4 px-6 flex flex-col gap-1 items-start shadow-lg ;
    }

    .sort-modal:after, .sort-modal:before {
        bottom: 100%;
        left: 80%;
        border: solid transparent;
        content: "";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
    }

    .sort-modal:after {
        /* border-color: rgba(255, 255, 255, 0); */
        /* border-bottom-color: #ffffff; */
        border-width: 6px;
        margin-left: -6px;
        @apply border-b-white dark:border-b-slate-900;
    }

    .sort-modal:before {
        /* border-color: rgba(0, 0, 0, 0); */
        /* border-bottom-color: #000000; */
        border-width: 7px;
        margin-left: -7px;
        @apply border-b-slate-300 dark:border-b-slate-400;
    }
</style>