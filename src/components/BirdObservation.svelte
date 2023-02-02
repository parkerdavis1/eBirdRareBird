<script>
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
</script>

<div class="grid-container">
    <div class="Observation-numberObserved">
        <p>1</p>
    </div>

    <p class="Heading">
        <span class="Heading-comName">{bird.comName}</span>
        <span class="Heading-sciName">{bird.sciName}</span>
        <span class="Heading-confirmed">{bird.obsReviewed? 'Confirmed' : 'Unconfirmed'}</span>
    </p>

    <div class="Observation-meta obs">
        <a href="{checklistLink}">
            <p class="Observation-date">
                <img src="{calendar}" alt="Calendar icon">
                {bird.obsDt}
            </p>
        </a>
        <a href="{googleMapsLink}">
            <p class="Observation-location">
                <img src="{mapIcon}" alt="map pointer icon">
                {bird.locName}
            </p>
        </a>
        <p class="Observation-username">
            <img src="{user}" alt="person icon">
            {bird.userDisplayName}
        </p>
    </div>
    {#if formComment}
    <div class="Observation-comments obs">
        <details>
            <summary>
                Details
                    <img src="{speechBubble}" alt="Speech Bubble icon">
                {#if bird.hasRichMedia}
                    <img src="{camera}" alt="Camera icon">
                {/if}
            </summary>
            <p>{formComment}</p>
        </details>
    </div>
    {/if}

</div>


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
        /* width: 100%; */
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
</style>
