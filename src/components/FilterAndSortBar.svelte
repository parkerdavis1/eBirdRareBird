<script>
    import { filters, isRadiusView} from '../store'
    import { createEventDispatcher } from 'svelte';
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
</script>

<div id="results-container" class="flex flex-row flex-wrap sm:flex-row justify-between items-baseline gap-x-4
            my-3 px-4 
            ">
    <div class:hidden={$filters.sortType === 'date'}>
        <input type="checkbox" id="showAll" bind:checked={showAll}>
        <label for="showAll">Expand all</label>
    </div>
    <div>
        <input type="checkbox" id="hideUnconfirmed" bind:checked={$filters.hideUnconfirmed}>
        <label for="hideUnconfirmed">Hide Unconfirmed</label>
    </div>
    {#if !$isRadiusView}
        <div>
            <input type="checkbox" id="onlyRichMedia" bind:checked={$filters.onlyRichMedia}>
            <label for="onlyRichMedia">Media Only</label>
        </div>
    {/if}
    <div>
        <label for="sort">Sort by:</label>
        <select name="sort" id="sort" bind:value={$filters.sortType}>
            <option value="taxonomic">Species (taxonomic)</option>
            <option value="alpha">Species (alphabetic)</option>
            <option value="location">Location</option>
            <option value="date">Date</option>
        </select>
    </div>
</div>