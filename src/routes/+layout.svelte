<script>
    // import "../css/pico.min.css"
    import "../css/app.css"
    // import { page } from '$app/stores';

    import { isRadiusView } from "../store";



</script>

<svelte:head>
    <title>Rare Bird Alert</title>
</svelte:head>

<!-- <div class="max-w-4xl mx-auto drop-shadow-2xl min-h-screen my-0 p-[min(10%, 2rem)]"> -->
    <main class="max-w-4xl mx-auto mt-4 p-4 min-h-screen">
        <h1 class="text-center text-2xl font-medium pb-2">Rare Bird Alert</h1>

        <div class="flex justify-around flex-row items-center 
        rounded-t-lg 
        h-10 p-1
        dark:bg-slate-800 bg-slate-100">
            <button 
                class:active={!$isRadiusView} 
                class="nav"
                on:click={() => $isRadiusView = false}
                >Region</button>
            <button 
                class:active={$isRadiusView} 
                class="nav"
                on:click={() => $isRadiusView = true}
                >Radius</button>
        </div>
        <slot></slot>
    </main>
<!-- </div> -->

<style lang="postcss">
    .active {
        @apply bg-white dark:bg-slate-700;
    }
    .nav {
        @apply flex justify-center items-center w-full h-full rounded-lg;
        @apply text-black dark:text-slate-200;
    }
</style>