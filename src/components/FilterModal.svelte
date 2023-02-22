<script>
    import { isRadiusView, filters } from "../store";

</script>

<div
    class="modal-container
            absolute top-full
            w-full py-10
            dark:bg-slate-700 dark:text-white
            bg-slate-100 text-slate-900
            shadow-lg
            border border-1 border-black
            ">
    <div class="max-w-4xl mx-auto
                flex flex-col gap-x-8 justify-start flex-wrap
                ">
        <div class="whitespace-nowrap">
            <input type="checkbox" id="hideUnconfirmed" bind:checked={$filters.hideUnconfirmed}>
            <label for="hideUnconfirmed">Hide Unconfirmed</label>
        </div>
        <div class:hidden={$isRadiusView} class="whitespace-nowrap">
            <input type="checkbox" id="onlyRichMedia" bind:checked={$filters.onlyRichMedia}>
            <label for="onlyRichMedia">Media Only</label>
        </div>
    </div>
</div>