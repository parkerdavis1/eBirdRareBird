<script>
    import { filters } from "$lib/store";
    export let filter;
    export let daysAgo = false;

    function removeTag() {
        $filters[filter.key].value = false
    }
</script>

<div class="flex items-center gap-x-1 
            py-1 px-2 h-min
            rounded-full 
            border border-slate-300 dark:border-black
            bg-slate-50 text-slate-800
            dark:bg-slate-600 dark:text-slate-50
            ">
    <span class="text-xs">{filter.value.label}</span>
    {#if !daysAgo}
        <button on:click={removeTag}>
            <!-- X icon  -->
            <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                <path fill="currentColor" d="M205.7 194.3a8.1 8.1 0 0 1 0 11.4a8.2 8.2 0 0 1-11.4 0L128 139.3l-66.3 66.4a8.2 8.2 0 0 1-11.4 0a8.1 8.1 0 0 1 0-11.4l66.4-66.3l-66.4-66.3a8.1 8.1 0 0 1 11.4-11.4l66.3 66.4l66.3-66.4a8.1 8.1 0 0 1 11.4 11.4L139.3 128Z"/>
            </svg>
        </button>
    {/if}
</div>