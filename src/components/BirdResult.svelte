<script>
    export let bird;
    export let id;

    const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${bird.lat},${bird.lng}`;
    const checklistLink = `https://ebird.org/checklist/${bird.subId}`

</script>

    <div class:gray={id%2 === 0}>
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
    </div>


<style>
    div {
        padding-left: 1rem;
        display: flex;
        flex-direction: row;
        column-gap: 1rem;
        flex-wrap: wrap;
        row-gap: 0.5rem;
        padding: 0.5rem;
    }

    p {
        margin: 0.25rem;
    }
    
    .count {
        font-weight: bold;
    }

    .media,
    .comments {
        color: #222;
    }

    .gray {
        background-color: #EEE;
    }

    @media (max-width: 500px) {
        div {
            flex-direction: column;
        }
    }
</style>