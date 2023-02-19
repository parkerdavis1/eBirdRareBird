<script>
    import { filters, isRadiusView} from '../store'
    import { createEventDispatcher } from 'svelte';
    import FilterModal from './FilterModal.svelte';
    import { clickOutside } from '../utils/click-outside';
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
        console.log("handleFilterButtonClick")
        if (showFilterModal == false) {
            showFilterModal = true;
        }
    }

    function handleOutclick() {
        console.log("handleOutclick!")
        setTimeout(() => {
            if (showFilterModal) {
                showFilterModal = false;
            }
        }, 20)
    }
</script>

<div id="results-container" class="flex flex-row flex-wrap sm:flex-row justify-between items-baseline gap-x-4
            my-3 px-4 
            relative
            ">

    <div class:hidden={$filters.sortType === 'date'}>
        <input type="checkbox" id="showAll" bind:checked={showAll}>
        <label for="showAll">Expand all</label>
    </div>
    <div class="flex items-baseline gap-x-4 flex-wrap">
        
     
        <!-- <div>
            <input type="checkbox" id="hideUnconfirmed" bind:checked={$filters.hideUnconfirmed}>
            <label for="hideUnconfirmed">Hide Unconfirmed</label>
        </div>
        <div class:hidden={$isRadiusView}>
            <input type="checkbox" id="onlyRichMedia" bind:checked={$filters.onlyRichMedia}>
            <label for="onlyRichMedia">Media Only</label>
        </div> -->
        <div>
            <label for="sort">Sort by:</label>
            <select name="sort" id="sort" bind:value={$filters.sortType}>
                <option value="taxonomic">Species (taxonomic)</option>
                <option value="alpha">Species (alphabetic)</option>
                <option value="location">Location</option>
                <option value="date">Date</option>
            </select>
        </div>
        <button class="relative flex items-baseline gap-x-1" on:click={handleFilterButtonClick}>
            <svg class="relative top-[.2em]" xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 2.4 24 24">
                <path fill="currentColor" d="M11 20.4q-.425 0-.713-.287T10 19.4q0-.425.288-.712T11 18.4h2q.425 0 .713.288T14 19.4q0 .425-.288.713T13 20.4h-2Zm-7-10q-.425 0-.713-.288T3 9.4q0-.425.288-.713T4 8.4h16q.425 0 .713.288T21 9.4q0 .425-.288.713T20 10.4H4Zm3 5q-.425 0-.713-.288T6 14.4q0-.425.288-.713T7 13.4h10q.425 0 .713.288T18 14.4q0 .425-.288.713T17 15.4H7Z"/>
            </svg>
            <span>
                Filters
            </span>
        </button>
        {#if showFilterModal}
        <div style="display: contents" use:clickOutside on:outclick={handleOutclick}>
            <FilterModal></FilterModal>
        </div>
        {/if}
    </div>

</div>