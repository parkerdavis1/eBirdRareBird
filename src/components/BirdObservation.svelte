<script>
    import { enhance } from '$app/forms';
    import { fade } from 'svelte/transition'

    import { allComments } from '../store'

    import dayjs from 'dayjs'
    import customParseFormat from 'dayjs/plugin/customParseFormat'
    dayjs.extend(customParseFormat)

    export let bird;

    import mapIcon from '../icons/map-marker.svg';
    import user from '../icons/person.svg';
    import calendar from '../icons/calendar-month-rounded.svg';
    import speechBubble from '../icons/speech-bubble-ltr.svg';
    import camera from '../icons/photo-camera-rounded.svg';

    $: formComment = $allComments[bird.obsId];

    const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${bird.lat},${bird.lng}`;
    const checklistLink = `https://ebird.org/checklist/${bird.subId}`
    const birdLink = `https://ebird.org/species/${bird.speciesCode}/${bird.subnational2Code}`

    const formattedDate = dayjs(bird.obsDt, "YYYY-MM-DD HH:mm").format("MMM D, YYYY HH:mm");

    let commentForm;
    function getComment(event) {
        event.preventDefault()
        commentForm.requestSubmit()
    }
</script>
<hr>
<div class="grid grid-cols-[auto_1fr] my-3">
    <div class="col-start-1 pr-4 text-sm">
        <p>{bird.howMany? bird.howMany : 'x'}</p>
    </div>

    <div class="col-start-2 flex items-baseline">
        <a href="{birdLink}" target="_blank" rel="noreferrer">
            <div class="flex flex-wrap items-baseline">
                <span class="mx-1 text-base whitespace-nowrap">{bird.comName}</span>
                <span class="mx-1 text-xs italic text-gray-500 dark:text-gray-400 whitespace-nowrap">{bird.sciName}</span>
            </div>
        </a>
        <span class="mx-3 text-xs font-medium {bird.obsReviewed? 'text-green-700 dark:text-green-500/90' : 'text-yellow-700 dark:text-yellow-400/90'}">{bird.obsReviewed? 'CONFIRMED' : 'UNCONFIRMED'}</span>
    </div>

    <div class="
        col-start-2 
        md:grid md:grid-cols-4 md:items-center
    ">
        <a href="{checklistLink}" target="_blank" rel="noreferrer">
            <p class="text-sm flex gap-1">
                <img src="{calendar}" alt="Calendar icon" class="inline">
                <!-- {bird.obsDt} -->
                {formattedDate}
            </p>
        </a>
        <a href="{googleMapsLink}" class="col-span-2" target="_blank" rel="noreferrer">
            <p class="text-sm grid gap-1 grid-cols-[auto,1fr]">
                <img src="{mapIcon}" alt="map pointer icon" class="inline col-start-1 relative top-[.15rem]">
                <span class="col-start-2">{bird.locName}</span>
            </p>
        </a>
        <p class="text-sm flex gap-1">
            <img src="{user}" alt="person icon" class="inline">
            <span>{bird.userDisplayName}</span>
        </p>
    </div>

    <form method="POST" action="?/getComments" on:submit|preventDefault class="col-start-2" bind:this={commentForm} use:enhance>
        <input type="hidden" name="checklistId" value={bird.subId}>
        <input type="hidden" name="obsId" value={bird.obsId}>

        <details on:toggle|once={getComment}>
            <summary class="cursor-pointer">
                <!-- <img src="{speechBubble}" alt="speech bubble icon" class="inline"> -->
                <span class="text-sm">Details</span>
                {#if bird.hasRichMedia}
                    <a href="{checklistLink}" target="_blank" rel="noreferrer">
                        <img src="{camera}" alt="camera icon" class="inline">
                    </a>
                {/if}
            </summary>
            {#if !formComment}
                <p class="animate-pulse text-sm">Loading...</p>
            {:else}
                <div class="col-start-2" in:fade>
                    <span class="text-sm">{formComment}</span>
                </div>
            {/if}
            <!-- {#if formComment}
                <div class="col-start-2">
                    <span class="text-sm">{formComment}</span>
                </div>
            {/if} -->
        </details>

    </form>

</div>