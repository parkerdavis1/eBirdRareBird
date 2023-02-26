<script>
    import { filters, isRadiusView} from '$lib/store'
    import { createEventDispatcher } from 'svelte';
    import { page } from '$app/stores';
    import FilterModal from '$lib/components/FilterModal.svelte';
    import FilterTag from '$lib/components/FilterTag.svelte';
    import { clickOutside } from '$lib/utils/click-outside';
    import { fade, fly } from 'svelte/transition'

    const dispatch = createEventDispatcher();

    let showAll;
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
    $: if ($filters) {
        activeFilters = getActiveFilters()
    }

   function getActiveFilters() {
        let activeFilters = []
        for (const [key, value] of Object.entries($filters)) {
            if (value.value === true) {
                activeFilters.push({ key, value })
            }
        }
        // console.log('activeFilters!', activeFilters)
        return activeFilters;
   } 

   console.log('from sortbar page: ', $page.url.searchParams.get('days'))
   $: days = $page.url.searchParams.get('days')

   $: daysAgoFilter = { value: { label: `Observations for past ${days == 1 ? 'day' : `${days} days`}` } }
</script>

<div id="results-container" class="flex flex-row flex-wrap sm:flex-row items-baseline gap-x-4 mt-4 relative">
    <!-- <div class:hidden={$filters.sortType === 'date'}>
        <input type="checkbox" id="showAll" bind:checked={showAll}>
        <label for="showAll">Expand all</label>
    </div> -->
    <div class="flex items-baseline gap-x-4 w-full flex-wrap md:flex-nowrap">
        <div class="flex justify-start gap-2 flex-wrap">
                <button on:click={() => dispatch('openFilterModal')}>
                    <FilterTag filter={daysAgoFilter} daysAgo={true}/>
                </button>
            {#each activeFilters as filter}
                <FilterTag filter={filter} />
            {/each}
        </div>
        <div class="ml-auto">
            <!-- <label for="sort">Sort by:</label> -->
            <select name="sort" id="sort" bind:value={$filters.sortType}>
                <option value="taxonomic">Species (taxonomic)</option>
                <option value="alpha">Species (alphabetic)</option>
                <option value="location">Location</option>
                <option value="date">Date</option>
            </select>
        </div>
    </div>

</div>