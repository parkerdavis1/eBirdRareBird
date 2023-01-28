<script>
    import { enhance } from '$app/forms';

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
        <a href="{checklistLink}">
            {bird.obsDt}
        </a>
    </td>

    {#if sortType !== 'location'}
        <td>
            <a href={googleMapsLink}>
                {bird.locName}
            </a>
        </td>
    {/if}

    <td>
        {bird.userDisplayName}
    </td>

    <td>
        <form method="POST" action="?/getComments" use:enhance>
            <input type="hidden" name="checklistId" value={bird.subId}>
            <input type="hidden" name="obsId" value={bird.obsId}>
            <button type="submit" disabled={formComment} hidden={formComment}>+</button>
        </form>
    </td>
</tr>

{#if formComment}
    <tr>
        <td colspan="5">
            {formComment}
        </td>
    </tr>
{/if}


<style>    
    .count {
        font-weight: bold;
    }
</style>