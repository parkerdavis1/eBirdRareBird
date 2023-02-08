<script>
    let showAll;
    let hideUnconfirmed;
    let sortType;
</script>

<div class="flex flex-row flex-wrap justify-between my-3">
    <div>
        <input type="checkbox" id="showAll" bind:checked={showAll}>
        <label for="showAll">Expand all</label>
    </div>
    <div>
        <input type="checkbox" id="hideUnconfirmed" bind:checked={hideUnconfirmed}>
        <label for="hideUnconfirmed">Hide Unconfirmed</label>
    </div>
    <div>
        <label for="sort">Sort by:</label>
        <select name="sort" id="sort" bind:value={sortType}>
            <option value="species">Species</option>
            <!-- <option value="date">Date</option> -->
            <option value="location">Location</option>
        </select>
    </div>
</div>