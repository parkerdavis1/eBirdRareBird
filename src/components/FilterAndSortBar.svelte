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
        setTimeout(()=> {
            if (showFilterModal == true) {
                showFilterModal = false;
            }
        })
    }


</script>

<div id="results-container" class="flex flex-row flex-wrap sm:flex-row justify-end items-baseline gap-x-4
            my-3 px-4 
            relative
            ">
    <!-- <div class:hidden={$filters.sortType === 'date'}>
        <input type="checkbox" id="showAll" bind:checked={showAll}>
        <label for="showAll">Expand all</label>
    </div> -->
    <div class="flex items-baseline gap-x-4 flex-wrap">
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

</div>