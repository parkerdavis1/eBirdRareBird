<script>
    import AltRegionForm from '../../components/AltRegionForm.svelte'
    import RegionForm from '../../components/RegionForm.svelte'

    export let form

    $: regionData = form?.regionResults
</script>

<div class="container max-w-lg mx-auto">
    <AltRegionForm 
        regionData={regionData}
    />
</div>