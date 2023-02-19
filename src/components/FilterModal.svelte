<script>
    import { isRadiusView, filters } from "../store";
</script>

<div class="modal-container
            flex gap-x-8 justify-end flex-wrap
            p-4
            left-0 sm:right-0 sm:left-auto
            bg-slate-100
            dark:bg-slate-800
            shadow-lg
            ">
    <!-- <div class:hidden={$filters.sortType === 'date'} class="whitespace-nowrap">
        <input type="checkbox" id="showAll" bind:checked={showAll}>
        <label for="showAll">Expand all</label>
    </div> -->
    <div class="whitespace-nowrap">
        <input type="checkbox" id="hideUnconfirmed" bind:checked={$filters.hideUnconfirmed}>
        <label for="hideUnconfirmed">Hide Unconfirmed</label>
    </div>
    <div class:hidden={$isRadiusView} class="whitespace-nowrap">
        <input type="checkbox" id="onlyRichMedia" bind:checked={$filters.onlyRichMedia}>
        <label for="onlyRichMedia">Media Only</label>
    </div>
</div>

<style>
    .modal-container {
        position: absolute;
        top: calc(100% + 1rem);
        width: 100%;
        top: 100%;
    }
</style>