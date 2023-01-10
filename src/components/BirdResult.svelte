<script>
    export let bird;
    export let id;

    const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${bird.lat},${bird.lng}`;
    const checklistLink = `https://ebird.org/checklist/${bird.subId}`

</script>

    <div class={id}>
        <p class="count">{bird.howMany}</p>
        <p>
            <a href="{checklistLink}">
                {bird.obsDt}
            </a>
        </p>
        <p>
            <a href={googleMapsLink}>
                {bird.locName}
            </a>
        </p>
        <p>
            {bird.userDisplayName}
        </p>

        {#if bird.hasComments}
            <span class="comments">Comments</span>
        {/if}

        {#if bird.hasRichMedia}
            <span class="media">Media</span>
        {/if}
    </div>


<style>
    div {
        /* border-bottom: 1px dotted black;  */
        padding-left: 1rem;
        display: flex;
        flex-direction: row;
        gap: 1rem;
        height: 2rem;
    }
    
    .count {
        font-weight: bold;
    }

    .media,
    .comments {
        color: #222;
    }


</style>