<script>
    export let home = false;
    import { filters } from '$lib/store'
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    console.log('PAGE', $page)


    let currentActive;
    $: if (!home) {
        // console.log('searchParamsDays', $page.url.searchParams.get('days'))
        currentActive = $filters.days
    }
    $: if (home) {
        currentActive = $filters.days
    }

    function handleClick(event) {
        const num = Number.parseInt(event.target.innerText);
        if (home) {
            $filters.days = num;
        } else {
            $filters.days = num;
            $page.url.searchParams.set('days', num); 
            goto(`?${$page.url.searchParams.toString()}`, { invalidateAll: true});
        }
    }
</script>

<h2>Time period (days ago):</h2>
<div class="flex justify-between border border-black dark:border-slate-200 w-80 max-w-full rounded-lg">
    <button on:click={handleClick} class:active={currentActive === 1}>1</button>
    <button on:click={handleClick} class:active={currentActive === 3}>3</button>
    <button on:click={handleClick} class:active={currentActive === 7}>7</button>
    <button on:click={handleClick} class:active={currentActive === 14}>14</button>
    <button on:click={handleClick} class:active={currentActive === 30}>30</button>
</div>

<style lang="postcss">
    button {
        @apply py-4 border-r border-slate-400 dark:border-slate-400 bg-white dark:bg-slate-800 w-full
    }

    button:first-of-type {
        @apply rounded-l-lg
    }

    button:last-of-type {
        @apply border-none rounded-r-lg
    }

    .active {
        @apply dark:bg-sky-800 bg-sky-100
    }
</style>