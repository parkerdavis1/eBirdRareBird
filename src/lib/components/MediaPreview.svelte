<script>
    export let media;
    export let delay;

    let loaded = false;
    let container;
</script>

<a href="{media.specimenUrl}" target="_blank" rel="noreferrer"
    class="relative {loaded ? "opacity-100" : "opacity-0"}" bind:this={container}
    >

    <img 
        src="{media.previewUrl}" 
        alt="{media.commonName}"
        class="max-h-56"
        on:load={ () => {
            loaded = true;
            container.style.transitionDelay = (100 * delay) + 'ms';
        }}
        >

    {#if loaded}
        <div class="meta-overlay 
                    flex flex-column flex-wrap gap-x-2
                    absolute bottom-0 left-0 right-0 w-full
                    p-1
                    bg-slate-900/75 text-slate-100
                    ">
            <span class="text-xs font-bold">&copy; {media.userDisplayName}</span>
            <span class="text-xs">Macaulay Library</span>
        </div>
   

        {#if media.mediaType === "Audio"}
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl">
                <svg class="h-12 w-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path class="fill-sky-600" fill="currentColor" d="m9.5 16.5l7-4.5l-7-4.5ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"/>
                </svg>
            </div>
        {/if}
    {/if}

</a>

<style>
    .meta-overlay {
        opacity: 0;
        transition: opacity 200ms ease;
    }

    a:hover .meta-overlay {
        opacity: 1;
    }

    path {
        transition: fill 400ms ease;
    }

    a:hover path {
        @apply fill-sky-700;
    }

    a {
        color: unset;
        transition: opacity 500ms ease;
    }
</style>


