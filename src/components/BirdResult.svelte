<script>
    import { enhance } from '$app/forms';

    import mapIcon from '../icons/map-marker.svg';
    import user from '../icons/person.svg';
    import calendar from '../icons/calendar-month-rounded.svg';
    import speechBubble from '../icons/speech-bubble.svg';
    import speechBubble2 from '../icons/speech-bubble-ltr.svg';
    import camera from '../icons/photo-camera-rounded.svg';

    export let bird;
    export let sortType;
    export let allComments;

    const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${bird.lat},${bird.lng}`;
    const checklistLink = `https://ebird.org/checklist/${bird.subId}`

    const checklistId = bird.subId;
    const obsId = bird.obsId;
    let comments;

    $: formComment = allComments[obsId]
</script>

<tr>
    <td class="count">{bird.howMany? bird.howMany : 'X'}</td>

    {#if sortType !== 'bird'}
        <td>
            {bird.comName}
        </td>
    {/if}

    <td>
        <a href="{checklistLink}" target="_blank">
            <img src="{calendar}" alt="calendar icon">
            {bird.obsDt}
        </a>
    </td>

    {#if sortType !== 'location'}
        <td>
            <a href={googleMapsLink} target="_blank">
                <img src="{mapIcon}" alt="map icon svg  ">
                {bird.locName}
            </a>
        </td>
    {/if}

    <td>
        <img src="{user}" alt="user icon">
        {bird.userDisplayName}
    </td>

    <td>
        <form method="POST" action="?/getComments" use:enhance>
            <input type="hidden" name="checklistId" value={bird.subId}>
            <input type="hidden" name="obsId" value={bird.obsId}>
            <button type="submit" disabled={formComment} hidden={formComment}>
                <img src="{speechBubble2}" alt="speech bubble icon">
            </button>
        </form>
    </td>
</tr>

{#if formComment}
<tr>
    <td colspan="5">
        <small>{formComment}</small>
        {#if bird.hasRichMedia}
            <a href="{checklistLink}" target="_blank">
                <img src="{camera}" alt="camera icon">
            </a>
        {/if}
    </td>
</tr>
{/if}


<style>    
    .count {
        font-weight: bold;
    }
</style>