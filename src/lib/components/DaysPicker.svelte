<script>
    export let home = false;
    import { region } from '$lib/store'
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    console.log('PAGE', $page)


    let days = $page.url.searchParams.get('days');
    let currentActive;
    $: if (!home) {
        currentActive = $page.url.searchParams.get('days')
    }
    $: if (home) {
        currentActive = $region.days.toString()
    }

    // $: otherIsActive = currentActive !== '3' && currentActive !== '7' && currentActive !== '14' && currentActive !== '30';

    function handleClick(event) {
        const num = Number.parseInt(event.target.innerText);
        if (home) {
            $region.days = num;
        } else {
            $page.url.searchParams.set('days', num); 
            goto(`?${$page.url.searchParams.toString()}`, { invalidateAll: true});
        }
    }

    // function otherClick() {
    //     currentActive = 'other'
    // }

    // function handleSliderChange() {
    //     const num = days;
    //     $page.url.searchParams.set('days', num);
    //     goto(`?${$page.url.searchParams.toString()}`, { invalidateAll: true});
    // }
</script>

<h2>Time period (days ago):</h2>
<div class="flex justify-between border border-black dark:border-slate-200 w-80 max-w-full rounded-lg">
    <!-- <a href="?days=3">CLICK FOR 3</a> -->
    <button on:click={handleClick} class:active={currentActive === '1'}>1</button>
    <button on:click={handleClick} class:active={currentActive === '3'}>3</button>
    <button on:click={handleClick} class:active={currentActive === '7'}>7</button>
    <button on:click={handleClick} class:active={currentActive === '14'}>14</button>
    <button on:click={handleClick} class:active={currentActive === '30'}>30</button>
    <!-- <button on:click={otherClick} class:active={otherIsActive}>{otherIsActive ? `Other (${days})` : 'Other'}</button> -->
</div>

<!-- {#if otherIsActive}
    <input class="max-w-md" type="range" name="days" id="days" min="1" max="30" bind:value={days} on:change={handleSliderChange}>
{/if} -->

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