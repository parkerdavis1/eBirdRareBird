<script>
    export let birdData

    import { page } from '$app/stores';

    import { loading, filters } from '../store'

    import ListSorter from './ListSorter.svelte';

    $: if (birdData) {
        $loading = false
    }

    let showAll = false;
</script>

<div class="flex flex-row flex-wrap sm:flex-row justify-between my-3 items-baseline gap-x-4">
    <div class:hidden={$filters.sortType === 'date'}>
        <input type="checkbox" id="showAll" bind:checked={showAll}>
        <label for="showAll">Expand all</label>
    </div>
    <div>
        <input type="checkbox" id="hideUnconfirmed" bind:checked={$filters.hideUnconfirmed}>
        <label for="hideUnconfirmed">Hide Unconfirmed</label>
    </div>
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

{#if $loading}
    <p class="animate-pulse">Loading...</p>
{:else if $page.error}
    <p>{$page.status}: {$page.error.message}</p>
{:else if birdData?.length < 1}
    <p>No results</p>
{:else}
    <ListSorter 
        birdData={birdData}
        showAll={showAll}
    />
{/if}
