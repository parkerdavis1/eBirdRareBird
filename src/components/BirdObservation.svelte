<script>
    import { enhance } from '$app/forms';

    export let bird;
    export let allComments;

    import mapIcon from '../icons/map-marker.svg';
    import user from '../icons/person.svg';
    import calendar from '../icons/calendar-month-rounded.svg';
    import speechBubble from '../icons/speech-bubble-ltr.svg';
    import camera from '../icons/photo-camera-rounded.svg';

    // let bird = {
    //     comName: "Cackling Goose",
    //     sciName: "Branta hutchinsii",
    //     obsReviewed: true,
    //     locName: "Scottsdale Community College",
    //     obsDt: "2023-01-29 07:00",
    //     hasRichMedia: true,
    //     userDisplayName: "Parker Davis",
    //     lat: "33.33333",
    //     lng: "-112.124424",
    //     subId: "S192851985"
    // }

    // let formComment = "Really saw this bird";

    $: formComment = allComments[bird.obsId]

    const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${bird.lat},${bird.lng}`;
    const checklistLink = `https://ebird.org/checklist/${bird.subId}`

    const handleDetails = () => {

    }
</script>
<hr>
<div class="grid grid-cols-[auto_1fr] my-3">
    <div class="col-start-1 pr-4">
        <p>{bird.howMany? bird.howMany : 'X'}</p>
    </div>

    <div class="col-start-2 flex items-baseline">
        <div>
            <span class="mx-1 text-sm whitespace-nowrap">{bird.comName}</span>
            <span class="mx-1 text-xs italic text-gray-500 dark:text-gray-400 whitespace-nowrap">{bird.sciName}</span>
        </div>

        <span class="mx-3 text-xs font-medium {bird.obsReviewed? 'text-green-700 dark:text-green-500/90' : 'text-yellow-700 dark:text-yellow-400/90'}">{bird.obsReviewed? 'CONFIRMED' : 'UNCONFIRMED'}</span>
    </div>

    <div class="
        col-start-2 
        md:grid md:grid-cols-4 md:items-center
    ">
        <a href="{checklistLink}">
            <p class="text-sm flex gap-1">
                <img src="{calendar}" alt="Calendar icon" class="inline">
                {bird.obsDt}
            </p>
        </a>
        <a href="{googleMapsLink}" class="col-span-2">
            <p class="text-sm flex gap-1">
                <img src="{mapIcon}" alt="map pointer icon" class="inline">
                {bird.locName}
            </p>
        </a>
        <p class="text-sm flex gap-1">
            <img src="{user}" alt="person icon" class="inline">
            <span>{bird.userDisplayName}</span>
        </p>
    </div>

    <form method="POST" action="?/getComments" use:enhance on:submit|preventDefault class="col-start-2">
        <input type="hidden" name="checklistId" value={bird.subId}>
        <input type="hidden" name="obsId" value={bird.obsId}>

        
        <button type="submit" class="text-sm" disabled={formComment}>
            <img src="{speechBubble}" alt="speech bubble icon" class="inline">
            <span>Details</span> 
        </button>
        {#if bird.hasRichMedia}
            <a href="{checklistLink}" target="_blank">
                <img src="{camera}" alt="camera icon" class="inline">
            </a>
        {/if}

        {#if formComment}
            <div class="col-start-2">
                <span class="text-sm">{formComment}</span>
            </div>
        {/if}
    </form>

    <!-- <details class="col-start-2">
        <summary>
            Details
                <img src="{speechBubble}" alt="Speech Bubble icon" class="inline">
            {#if bird.hasRichMedia}
                <img src="{camera}" alt="Camera icon" class="inline">
            {/if}
        </summary>
        <p>{formComment}</p>
    </details> -->

</div>

<!-- 
<style>
    .grid-container {
        display: grid;
        grid-template-columns: auto [obs] 1fr auto [obs-end];
        width: 100%;
        align-items: baseline;
    }

    .Observation-numberObserved {
        grid-column: 1/2;
        min-width: 1.2em;
    }

    .obs {
        grid-column: obs / obs-end;
    }

    .Heading-confirmed {
        text-align: right;
    }

    .Heading-comName {
        white-space: nowrap;
    }

    .Heading-sciName {
        font-size: .75em;
        font-style: italic;
        white-space: nowrap;
    }

    .Observation-meta {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        align-items: center;
    }

    img {
        align-self: center;
    }

    @media screen and (max-width: 800px) {
        .Observation-meta {
            flex-flow: column wrap;
            align-items: start;
        }
    }
</style> -->
